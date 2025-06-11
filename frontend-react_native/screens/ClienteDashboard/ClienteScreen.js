import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Modal, TextInput, FlatList, Alert } from 'react-native';
import AuthButton from '../../components/AuthButton';
import { styles } from '../../styles/globalStyles';
import { usuarios } from '../../data/data';

export default function ClienteScreen({ cliente, onLogout }) {
  // Estados
  const [restaurantes, setRestaurantes] = useState([]);
  const [pedidoActual, setPedidoActual] = useState(null);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);
  const [combosSeleccionados, setCombosSeleccionados] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFacturaVisible, setModalFacturaVisible] = useState(false);
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [repartidores, setRepartidores] = useState([]);
  const [factura, setFactura] = useState(null);
  const [distanciaEntrega, setDistanciaEntrega] = useState(5); // Valor por defecto en km

  // Cargar datos iniciales
  useEffect(() => {
    // Filtrar restaurantes, repartidores y pedidos del cliente
    const restaurantesData = usuarios.filter(u => u.rol === 'restaurante');
    const repartidoresData = usuarios.filter(u => u.rol === 'repartidor');
    
    setRestaurantes(restaurantesData);
    setRepartidores(repartidoresData);
    
    // Simular historial de pedidos (en una app real esto vendría de una API)
    const pedidosCliente = [
      {
        id: '001',
        restaurante: 'Sabor Tico',
        combos: [{numero: 1, cantidad: 2}],
        estado: 'entregado',
        fecha: '2023-05-15',
        total: 8000
      }
    ];
    setHistorialPedidos(pedidosCliente);
  }, []);

  // Función para seleccionar restaurante
  const seleccionarRestaurante = (restaurante) => {
    if (cliente.estado !== 'activo') {
      Alert.alert('Cuenta suspendida', 'Su cuenta está suspendida y no puede realizar pedidos.');
      return;
    }
    setRestauranteSeleccionado(restaurante);
    setModalVisible(true);
  };

  // Función para agregar combo al pedido
  const agregarCombo = (combo) => {
    const existente = combosSeleccionados.find(c => c.numero === combo.numero);
    
    if (existente) {
      setCombosSeleccionados(combosSeleccionados.map(c => 
        c.numero === combo.numero ? {...c, cantidad: c.cantidad + 1} : c
      ));
    } else {
      setCombosSeleccionados([...combosSeleccionados, {...combo, cantidad: 1}]);
    }
  };

  // Función para quitar combo del pedido
  const quitarCombo = (comboNumero) => {
    const existente = combosSeleccionados.find(c => c.numero === comboNumero);
    
    if (existente && existente.cantidad > 1) {
      setCombosSeleccionados(combosSeleccionados.map(c => 
        c.numero === comboNumero ? {...c, cantidad: c.cantidad - 1} : c
      ));
    } else {
      setCombosSeleccionados(combosSeleccionados.filter(c => c.numero !== comboNumero));
    }
  };

  // Función para realizar el pedido
  const realizarPedido = () => {
    if (combosSeleccionados.length === 0) {
      Alert.alert('Pedido vacío', 'Por favor seleccione al menos un combo.');
      return;
    }

    // Calcular subtotal
    const subtotal = combosSeleccionados.reduce((total, combo) => 
      total + (combo.precio * combo.cantidad), 0);

    // Encontrar repartidor disponible con menos de 4 amonestaciones
    const repartidorDisponible = repartidores.find(r => 
      r.estado === 'disponible' && r.amonestaciones < 4);

    if (!repartidorDisponible) {
      Alert.alert('No hay repartidores', 'No hay repartidores disponibles en este momento.');
      return;
    }

    // Calcular costo de transporte (asumimos día hábil)
    const costoTransporte = distanciaEntrega * repartidorDisponible.costoPorKm.habil;
    
    // Calcular IVA (13%)
    const iva = (subtotal + costoTransporte) * 0.13;
    
    // Calcular total
    const total = subtotal + costoTransporte + iva;

    // Crear factura
    const nuevaFactura = {
      id: `FAC-${Date.now()}`,
      fecha: new Date().toISOString(),
      cliente: cliente.nombre,
      restaurante: restauranteSeleccionado.nombre,
      repartidor: repartidorDisponible.nombre,
      combos: [...combosSeleccionados],
      subtotal,
      costoTransporte,
      iva,
      total,
      estado: 'en preparación'
    };

    // Crear pedido
    const nuevoPedido = {
      id: `PED-${Date.now()}`,
      restaurante: restauranteSeleccionado.nombre,
      combos: combosSeleccionados.map(c => ({numero: c.numero, cantidad: c.cantidad})),
      estado: 'en preparación',
      fecha: new Date().toISOString(),
      total,
      repartidor: repartidorDisponible.nombre
    };

    // Actualizar estados
    setFactura(nuevaFactura);
    setHistorialPedidos([...historialPedidos, nuevoPedido]);
    setPedidoActual(nuevoPedido);
    
    // Actualizar repartidor a ocupado
    const repartidoresActualizados = repartidores.map(r => 
      r.cedula === repartidorDisponible.cedula ? {...r, estado: 'ocupado'} : r
    );
    setRepartidores(repartidoresActualizados);
    
    // Cerrar modal y resetear selecciones
    setModalVisible(false);
    setModalFacturaVisible(true);
    setCombosSeleccionados([]);
    setRestauranteSeleccionado(null);
  };

  // Función para cancelar pedido
  const cancelarPedido = () => {
    setCombosSeleccionados([]);
    setRestauranteSeleccionado(null);
    setModalVisible(false);
  };

  // Función para calificar repartidor
  const calificarRepartidor = (pedidoId, calificacion) => {
    // En una app real, esto actualizaría el backend
    Alert.alert('Calificación enviada', `Gracias por calificar con ${calificacion} estrellas.`);
    
    // Marcar pedido como calificado
    setHistorialPedidos(historialPedidos.map(p => 
      p.id === pedidoId ? {...p, calificado: true} : p
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.dashboardContainer}>
      <Text style={styles.bienvenida}>Hola {cliente.nombre}, escoge tu restaurante</Text>
      <Text style={styles.infoText}>Estado: {cliente.estado}</Text>
      
      {/* Lista de restaurantes */}
      <Text style={styles.sectionTitle}>Restaurantes disponibles</Text>
      <FlatList
        data={restaurantes}
        keyExtractor={(item) => item.cedula}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={styles.restauranteCard}
            onPress={() => seleccionarRestaurante(item)}
          >
            <Text style={styles.restauranteNombre}>{item.nombre}</Text>
            <Text style={styles.restauranteTipo}>Tipo: {item.tipoComida}</Text>
            <Text style={styles.restauranteDireccion}>{item.direccion}</Text>
          </TouchableOpacity>
        )}
      />
      
      {/* Historial de pedidos */}
      <Text style={styles.sectionTitle}>Tus pedidos recientes</Text>
      {historialPedidos.length > 0 ? (
        <FlatList
          data={historialPedidos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.pedidoCard}>
              <Text style={styles.pedidoRestaurante}>{item.restaurante}</Text>
              <Text>Estado: {item.estado}</Text>
              <Text>Total: ₡{item.total.toLocaleString()}</Text>
              <Text>Fecha: {new Date(item.fecha).toLocaleDateString()}</Text>
              
              {item.estado === 'entregado' && !item.calificado && (
                <View style={styles.calificacionContainer}>
                  <Text>Califica al repartidor:</Text>
                  <View style={styles.estrellasContainer}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <TouchableOpacity 
                        key={star}
                        onPress={() => calificarRepartidor(item.id, star)}
                      >
                        <Text style={styles.estrella}>★</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No tienes pedidos recientes</Text>
      )}
      
      {/* Modal para seleccionar combos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {restauranteSeleccionado && (
              <>
                <Text style={styles.modalTitle}>{restauranteSeleccionado.nombre}</Text>
                <Text style={styles.modalSubtitle}>Combos disponibles</Text>
                
                <FlatList
                  data={restauranteSeleccionado.combos}
                  keyExtractor={(item) => item.numero.toString()}
                  renderItem={({item}) => (
                    <View style={styles.comboItem}>
                      <View style={styles.comboInfo}>
                        <Text style={styles.comboNombre}>Combo #{item.numero}</Text>
                        <Text>{item.descripcion}</Text>
                        <Text style={styles.comboPrecio}>₡{item.precio.toLocaleString()}</Text>
                      </View>
                      
                      <View style={styles.comboActions}>
                        <TouchableOpacity 
                          style={styles.comboButton}
                          onPress={() => quitarCombo(item.numero)}
                        >
                          <Text>-</Text>
                        </TouchableOpacity>
                        
                        <Text style={styles.comboCantidad}>
                          {combosSeleccionados.find(c => c.numero === item.numero)?.cantidad || 0}
                        </Text>
                        
                        <TouchableOpacity 
                          style={styles.comboButton}
                          onPress={() => agregarCombo(item)}
                        >
                          <Text>+</Text>
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
                        <Text key={combo.numero}>
                          {combo.cantidad}x Combo #{combo.numero} - ₡{(combo.precio * combo.cantidad).toLocaleString()}
                        </Text>
                      ))}
                      <Text style={styles.resumenTotal}>
                        Subtotal: ₡{combosSeleccionados.reduce((total, combo) => 
                          total + (combo.precio * combo.cantidad), 0).toLocaleString()}
                      </Text>
                    </>
                  ) : (
                    <Text>No has seleccionado combos</Text>
                  )}
                </View>
                
                <View style={styles.modalButtons}>
                  <AuthButton 
                    title="Cancelar"
                    onPress={cancelarPedido}
                    style={styles.secondaryButton}
                  />
                  <AuthButton 
                    title="Realizar pedido"
                    onPress={realizarPedido}
                    style={styles.primaryButton}
                  />
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
          <View style={styles.modalContent}>
            {factura && (
              <>
                <Text style={styles.modalTitle}>Factura #{factura.id}</Text>
                <Text>Fecha: {new Date(factura.fecha).toLocaleString()}</Text>
                <Text>Cliente: {factura.cliente}</Text>
                <Text>Restaurante: {factura.restaurante}</Text>
                <Text>Repartidor: {factura.repartidor}</Text>
                
                <Text style={styles.sectionTitle}>Detalle del pedido:</Text>
                {factura.combos.map(combo => (
                  <Text key={combo.numero}>
                    {combo.cantidad}x Combo #{combo.numero} - ₡{(combo.precio * combo.cantidad).toLocaleString()}
                  </Text>
                ))}
                
                <View style={styles.facturaTotales}>
                  <Text>Subtotal: ₡{factura.subtotal.toLocaleString()}</Text>
                  <Text>Transporte ({distanciaEntrega}km): ₡{factura.costoTransporte.toLocaleString()}</Text>
                  <Text>IVA (13%): ₡{factura.iva.toLocaleString()}</Text>
                  <Text style={styles.facturaTotal}>Total: ₡{factura.total.toLocaleString()}</Text>
                </View>
                
                <Text style={styles.estadoPedido}>Estado: {factura.estado}</Text>
                
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
    </ScrollView>
  );
}