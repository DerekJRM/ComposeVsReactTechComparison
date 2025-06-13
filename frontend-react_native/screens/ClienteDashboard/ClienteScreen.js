import React, { useState, useEffect } from 'react';
import { 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  View, 
  Modal, 
  FlatList, 
  Alert, 
  Platform,
  Dimensions
} from 'react-native';
import AuthButton from '../../components/AuthButton';
import { styles } from '../../styles/globalStyles';

// Configuración de la API basada en la plataforma
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://192.168.100.4:8080'; // Ajusta esta IP para tu red local
  } else if (Platform.OS === 'web') {
    return 'http://localhost:8080'; // Para desarrollo web
  }
  return 'http://localhost:8080'; // iOS simulator u otros
};

const API_URL = `${getBaseUrl()}/api`;
const isWeb = Platform.OS === 'web';
const windowWidth = Dimensions.get('window').width;

export default function ClienteScreen({ cliente, onLogout }) {
  // Estados
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);
  const [combosSeleccionados, setCombosSeleccionados] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFacturaVisible, setModalFacturaVisible] = useState(false);
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [repartidores, setRepartidores] = useState([]);
  const [factura, setFactura] = useState(null);
  const [combosRestaurante, setCombosRestaurante] = useState([]);
  const [detallesComboModal, setDetallesComboModal] = useState(false);
  const [comboSeleccionadoDetalle, setComboSeleccionadoDetalle] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatosIniciales();
  }, [cliente]);

  const cargarDatosIniciales = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchRestaurantes(),
        fetchRepartidores(),
        cliente?.cedula && fetchPedidosCliente(cliente.cedula)
      ]);
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos iniciales');
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurantes = async () => {
    try {
      const response = await fetch(`${API_URL}/restaurantes`);
      if (!response.ok) throw new Error('Error en la respuesta');
      const data = await response.json();
      setRestaurantes(data);
    } catch (error) {
      console.error('Error fetching restaurantes:', error);
      throw error;
    }
  };

  const fetchRepartidores = async () => {
    try {
      const response = await fetch(`${API_URL}/repartidores`);
      if (!response.ok) throw new Error('Error en la respuesta');
      const data = await response.json();
      setRepartidores(data);
    } catch (error) {
      console.error('Error fetching repartidores:', error);
      throw error;
    }
  };

  const fetchPedidosCliente = async (cedula) => {
    try {
      const response = await fetch(`${API_URL}/clientes/${cedula}/pedidos`);
      if (!response.ok) throw new Error('Error en la respuesta');
      const data = await response.json();
      setHistorialPedidos(data);
    } catch (error) {
      console.error('Error fetching pedidos:', error);
      throw error;
    }
  };

  const fetchCombosRestaurante = async (cedulaJuridica) => {
    try {
      const response = await fetch(`${API_URL}/restaurantes/${cedulaJuridica}/combos`);
      if (!response.ok) throw new Error('Error en la respuesta');
      const data = await response.json();
      setCombosRestaurante(data);
    } catch (error) {
      console.error('Error fetching combos:', error);
      throw error;
    }
  };

  const seleccionarRestaurante = async (restaurante) => {
    /*
    if (cliente.estado !== 'ACTIVO') {
      Alert.alert('Cuenta suspendida', 'Su cuenta está suspendida y no puede realizar pedidos.');
      return;
    }
    */
    try {
      setLoading(true);
      setRestauranteSeleccionado(restaurante);
      await fetchCombosRestaurante(restaurante.cedulaJuridica);
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los combos del restaurante');
    } finally {
      setLoading(false);
    }
  };

  const agregarCombo = (combo) => {
    const existente = combosSeleccionados.find(c => c.id === combo.id);
    
    if (existente) {
      setCombosSeleccionados(combosSeleccionados.map(c => 
        c.id === combo.id ? {...c, cantidad: c.cantidad + 1} : c
      ));
    } else {
      setCombosSeleccionados([...combosSeleccionados, {...combo, cantidad: 1}]);
    }
  };

  const quitarCombo = (comboId) => {
    const existente = combosSeleccionados.find(c => c.id === comboId);
    
    if (existente && existente.cantidad > 1) {
      setCombosSeleccionados(combosSeleccionados.map(c => 
        c.id === comboId ? {...c, cantidad: c.cantidad - 1} : c
      ));
    } else {
      setCombosSeleccionados(combosSeleccionados.filter(c => c.id !== comboId));
    }
  };

  const realizarPedido = async () => {
    if (combosSeleccionados.length === 0) {
      Alert.alert('Pedido vacío', 'Por favor seleccione al menos un combo.');
      return;
    }

    try {
      setLoading(true);
      
      // Encontrar repartidor disponible con menos de 4 amonestaciones
      const repartidorDisponible = repartidores.find(r => 
        r.estado === 'DISPONIBLE' && (r.amonestaciones === null || r.amonestaciones < 4));

      if (!repartidorDisponible) {
        Alert.alert('No hay repartidores', 'No hay repartidores disponibles en este momento.');
        return;
      }

      // Calcular subtotal
      const subtotal = combosSeleccionados.reduce((total, combo) => 
        total + (combo.precio * combo.cantidad), 0);

      // Crear el objeto pedido según tu modelo de backend
      const pedidoData = {
        clienteId: cliente.cedula,
        restauranteId: restauranteSeleccionado.cedulaJuridica,
        repartidorId: repartidorDisponible.cedula,
        estado: 'EN_PREPARACION',
        subtotal: subtotal,
        costoTransporte: 5 * (repartidorDisponible.costoKmHabil || 1000), // Distancia fija de 5km
        combos: combosSeleccionados.map(combo => ({
          comboId: combo.id,
          cantidad: combo.cantidad,
          precioUnit: combo.precio
        }))
      };

      // Enviar pedido al backend
      const response = await fetch(`${API_URL}/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el pedido');
      }

      const nuevoPedido = await response.json();
      
      // Obtener la factura asociada (asumiendo que tu backend la genera automáticamente)
      const facturaResponse = await fetch(`${API_URL}/pedidos/${nuevoPedido.id}/factura`);
      if (facturaResponse.ok) {
        const facturaData = await facturaResponse.json();
        setFactura(facturaData);
      }

      // Actualizar el historial de pedidos
      await fetchPedidosCliente(cliente.cedula);
      
      // Cerrar modal y resetear selecciones
      setModalVisible(false);
      setModalFacturaVisible(true);
      setCombosSeleccionados([]);
      setRestauranteSeleccionado(null);
    } catch (error) {
      console.error('Error al realizar pedido:', error);
      Alert.alert('Error', 'No se pudo completar el pedido');
    } finally {
      setLoading(false);
    }
  };

  const cancelarPedido = () => {
    setCombosSeleccionados([]);
    setRestauranteSeleccionado(null);
    setModalVisible(false);
  };

  const calificarRepartidor = async (pedidoId, calificacion) => {
    try {
      setLoading(true);
      const quejaData = {
        repartidorId: historialPedidos.find(p => p.id === pedidoId)?.repartidorId,
        clienteId: cliente.cedula,
        descripcion: `Calificación: ${calificacion} estrellas`
      };

      const response = await fetch(`${API_URL}/quejas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quejaData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar calificación');
      }

      Alert.alert('Calificación enviada', `Gracias por calificar con ${calificacion} estrellas.`);
      await fetchPedidosCliente(cliente.cedula);
    } catch (error) {
      console.error('Error al calificar:', error);
      Alert.alert('Error', 'No se pudo enviar la calificación');
    } finally {
      setLoading(false);
    }
  };

  // Estilos dinámicos para diferentes plataformas
  const dynamicStyles = {
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: isWeb ? (windowWidth > 600 ? '60%' : '90%') : '90%',
      maxWidth: 500,
      maxHeight: isWeb ? '80vh' : undefined,
    },
    restauranteCard: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      width: isWeb ? (windowWidth > 600 ? '48%' : '100%') : '100%',
    },
    restaurantesContainer: {
      flexDirection: isWeb ? 'row' : 'column',
      flexWrap: isWeb ? 'wrap' : 'nowrap',
      justifyContent: isWeb ? 'space-between' : 'flex-start',
    },
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.bienvenida}>Hola {cliente.nombre}</Text>
        <Text style={styles.estadoCliente}>Estado: {cliente.estado}</Text>
      </View>

      {/* Lista de restaurantes - SOLUCIÓN PRINCIPAL */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Restaurantes disponibles</Text>
        <FlatList
          data={restaurantes}
          keyExtractor={(item) => item.cedulaJuridica}
          renderItem={({ item }) => (
            <RestauranteCard 
              item={item} 
              onPress={() => seleccionarRestaurante(item)} 
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay restaurantes disponibles</Text>
          }
        />
      </View>

      {/* Historial de pedidos - SIN SCROLLVIEW ANIDADO */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Tus pedidos recientes</Text>
        <FlatList
          data={historialPedidos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PedidoCard item={item} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tienes pedidos recientes</Text>
          }
        />
      </View>
      
      {/* Modal para seleccionar combos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={dynamicStyles.modalContent}>
            {restauranteSeleccionado && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{restauranteSeleccionado.nombre}</Text>
                  <Text style={styles.modalSubtitle}>Combos disponibles</Text>
                </View>
                
                <FlatList
                  data={combosRestaurante}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) => (
                    <View style={styles.comboItem}>
                      <TouchableOpacity onPress={() => setComboSeleccionadoDetalle(item)}>
                        <View style={styles.comboInfo}>
                          <View style={styles.comboTextInfo}>
                            <Text style={styles.comboNombre}>Combo #{item.comboNum}</Text>
                            <Text style={styles.comboDescripcion} numberOfLines={1}>
                              {item.descripcion || 'Delicioso combo'}
                            </Text>
                            <Text style={styles.comboPrecio}>₡{item.precio?.toLocaleString() || '0'}</Text>
                            {item.ingredientes && (
                              <Text style={styles.comboIngredientes}>
                                Ingredientes: {item.ingredientes}
                              </Text>
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                      
                      <View style={styles.comboActions}>
                        <TouchableOpacity 
                          style={styles.comboButton}
                          onPress={() => quitarCombo(item.id)}
                        >
                          <Text style={styles.comboButtonText}>-</Text>
                        </TouchableOpacity>
                        
                        <Text style={styles.comboCantidad}>
                          {combosSeleccionados.find(c => c.id === item.id)?.cantidad || 0}
                        </Text>
                        
                        <TouchableOpacity 
                          style={styles.comboButton}
                          onPress={() => agregarCombo(item)}
                        >
                          <Text style={styles.comboButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
                
                <View style={styles.resumenPedido}>
                  <Text style={styles.resumenTitle}>Tu pedido:</Text>
                  {combosSeleccionados.length > 0 ? (
                    <>
                      {combosSeleccionados.map(combo => (
                        <View key={combo.id} style={styles.resumenItem}>
                          <Text style={styles.resumenItemText}>
                            {combo.cantidad}x Combo #{combo.comboNum}
                          </Text>
                          <Text style={styles.resumenItemPrecio}>
                            ₡{(combo.precio * combo.cantidad).toLocaleString()}
                          </Text>
                        </View>
                      ))}
                      <View style={styles.resumenTotalContainer}>
                        <Text style={styles.resumenTotal}>
                          Subtotal: ₡{combosSeleccionados.reduce((total, combo) => 
                            total + (combo.precio * combo.cantidad), 0).toLocaleString()}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <Text style={styles.noItemsText}>No has seleccionado combos</Text>
                  )}
                </View>
                
                <View style={styles.modalButtons}>
                  <AuthButton 
                    title="Cancelar"
                    onPress={cancelarPedido}
                    style={styles.secondaryButton}
                  />
                  <AuthButton 
                    title={loading ? "Procesando..." : "Realizar pedido"}
                    onPress={realizarPedido}
                    style={styles.primaryButton}
                    disabled={combosSeleccionados.length === 0 || loading}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      
      {/* Modal de detalles del combo */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={!!comboSeleccionadoDetalle}
        onRequestClose={() => setComboSeleccionadoDetalle(null)}
      >
        <View style={styles.modalContainer}>
          <View style={dynamicStyles.modalContent}>
            {comboSeleccionadoDetalle && (
              <>
                <Text style={styles.modalTitle}>Combo #{comboSeleccionadoDetalle.comboNum}</Text>
                <Text style={styles.comboDetallePrecio}>
                  ₡{comboSeleccionadoDetalle.precio?.toLocaleString() || '0'}
                </Text>
                <Text style={styles.comboDetalleDescripcion}>
                  {comboSeleccionadoDetalle.descripcion || 'Descripción no disponible'}
                </Text>
                <Text style={styles.comboDetalleIngredientes}>
                  Ingredientes: {comboSeleccionadoDetalle.ingredientes || 'No especificado'}
                </Text>
                
                <View style={styles.comboDetalleActions}>
                  <TouchableOpacity 
                    style={styles.comboDetalleButton}
                    onPress={() => {
                      agregarCombo(comboSeleccionadoDetalle);
                      setComboSeleccionadoDetalle(null);
                    }}
                  >
                    <Text style={styles.comboDetalleButtonText}>Agregar al pedido</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.comboDetalleCloseButton}
                    onPress={() => setComboSeleccionadoDetalle(null)}
                  >
                    <Text style={styles.comboDetalleCloseButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      
      {/* Modal de factura */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalFacturaVisible}
        onRequestClose={() => setModalFacturaVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={dynamicStyles.modalContent}>
            {factura && (
              <>
                <Text style={styles.modalTitle}>¡Pedido realizado con éxito!</Text>
                <Text style={styles.facturaNumero}>Factura #{factura.id}</Text>
                <Text style={styles.facturaFecha}>
                  Fecha: {new Date(factura.fechaPedido).toLocaleString()}
                </Text>
                
                <View style={styles.facturaInfoContainer}>
                  <Text style={styles.facturaLabel}>Cliente:</Text>
                  <Text style={styles.facturaValue}>{factura.cliente}</Text>
                  
                  <Text style={styles.facturaLabel}>Restaurante:</Text>
                  <Text style={styles.facturaValue}>{factura.restaurante}</Text>
                  
                  <Text style={styles.facturaLabel}>Repartidor:</Text>
                  <Text style={styles.facturaValue}>{factura.repartidor || 'Asignado'}</Text>
                </View>
                
                <View style={styles.facturaTotales}>
                  <View style={styles.facturaLineItem}>
                    <Text style={styles.facturaLineLabel}>Subtotal:</Text>
                    <Text style={styles.facturaLineValue}>
                      ₡{factura.subtotal?.toLocaleString() || '0'}
                    </Text>
                  </View>
                  
                  <View style={styles.facturaLineItem}>
                    <Text style={styles.facturaLineLabel}>Transporte:</Text>
                    <Text style={styles.facturaLineValue}>
                      ₡{factura.costoTransporte?.toLocaleString() || '0'}
                    </Text>
                  </View>
                  
                  <View style={styles.facturaLineItem}>
                    <Text style={styles.facturaLineLabel}>IVA (13%):</Text>
                    <Text style={styles.facturaLineValue}>
                      ₡{factura.iva?.toLocaleString() || '0'}
                    </Text>
                  </View>
                  
                  <View style={[styles.facturaLineItem, styles.facturaTotalItem]}>
                    <Text style={styles.facturaTotalLabel}>Total:</Text>
                    <Text style={styles.facturaTotalValue}>
                      ₡{factura.total?.toLocaleString() || '0'}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.estadoPedido}>
                  Estado: {factura.estado?.replace('_', ' ') || 'Estado desconocido'}
                </Text>
                
                <Text style={styles.facturaTiempoEstimado}>
                  Tiempo estimado de entrega: 30-45 minutos
                </Text>
                
                <AuthButton 
                  title="Cerrar"
                  onPress={() => setModalFacturaVisible(false)}
                  style={styles.primaryButton}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
      
      <AuthButton 
        title="Cerrar sesión" 
        onPress={onLogout}
        style={styles.logoutButton}
        textStyle={styles.logoutButtonText}
      />
    </View>
  );
}

// Componentes adicionales para mejor organización
const RestauranteCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.restauranteCard} onPress={onPress}>
    <View style={styles.restauranteInfo}>
      <Text style={styles.restauranteNombre}>{item.nombre}</Text>
      <Text style={styles.restauranteDetalle}>{item.tipoComida}</Text>
      <Text style={styles.restauranteDetalle}>{item.direccion}</Text>
      <Text style={styles.restauranteDetalle}>Teléfono: {item.telefono}</Text>
    </View>
  </TouchableOpacity>
);

const PedidoCard = ({ item }) => (
  <View style={styles.pedidoCard}>
    <Text style={styles.pedidoId}>Pedido #{item.id}</Text>
    <Text>Estado: {item.estado}</Text>
    <Text>Total: ₡{item.total?.toLocaleString()}</Text>
    <Text>Fecha: {new Date(item.fechaPedido).toLocaleDateString()}</Text>
  </View>
);