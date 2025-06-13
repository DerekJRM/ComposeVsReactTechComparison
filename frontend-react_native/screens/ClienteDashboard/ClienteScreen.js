import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Modal, StyleSheet, Platform, ActivityIndicator, Alert, TextInput, Dimensions } from 'react-native';
import AuthButton from '../../components/AuthButton';
import { styles } from '../../styles/globalStyles';

// Configuración de la API
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://192.168.100.4:8080';
  } else if (Platform.OS === 'web') {
    return 'http://localhost:8080';
  }
  return 'http://localhost:8080';
};

const BASE_URL = getBaseUrl();

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');
const isMobile = width < 768; // Consideramos móvil si el ancho es menor a 768px

export default function ClienteScreen({ cliente, onLogout }) {
  const [restaurantes, setRestaurantes] = useState([]);
  const [combos, setCombos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [selectedRestaurante, setSelectedRestaurante] = useState(null);
  const [selectedCombos, setSelectedCombos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidosModalVisible, setPedidosModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [costoTransporte] = useState(2000);
  const [quejasModalVisible, setQuejasModalVisible] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [descripcionQueja, setDescripcionQueja] = useState('');
  const [repartidorId, setRepartidorId] = useState('');
  const [quejasCliente, setQuejasCliente] = useState([]);

  useEffect(() => {
    fetchRestaurantes();
    fetchPedidosCliente();
  }, []);

  useEffect(() => {
    if (selectedRestaurante) {
      fetchCombosByRestaurante(selectedRestaurante.cedulaJuridica);
    }
  }, [selectedRestaurante]);

  useEffect(() => {
    const calculatedSubtotal = selectedCombos.reduce((acc, combo) => acc + (combo.precio * combo.cantidad), 0);
    setSubtotal(calculatedSubtotal);
  }, [selectedCombos]);

  useEffect(() => {
    if (cliente?.cedula) {
      fetchQuejasCliente();
    }
  }, [cliente]);

  const fetchQuejasCliente = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/clientes/${cliente.cedula}/quejas`);
      if (!response.ok) throw new Error('Error al obtener quejas');
      const data = await response.json();
      setQuejasCliente(data);
    } catch (error) {
      console.error('Error fetching quejas:', error);
    }
  };

  const abrirModalQueja = (pedido) => {
    setSelectedPedido(pedido);
    setDescripcionQueja('');
    setRepartidorId(pedido.repartidorId || '');
    setQuejasModalVisible(true);
  };

  const enviarQueja = async () => {
    if (!descripcionQueja) {
      Alert.alert('Error', 'Debes ingresar una descripción para la queja');
      return;
    }

    try {
      setLoading(true);
      
      const quejaData = {
        repartidorId: repartidorId,
        clienteId: cliente.cedula,
        descripcion: descripcionQueja
      };

      const response = await fetch(`${BASE_URL}/api/quejas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quejaData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al enviar queja');
      }

      Alert.alert('Éxito', 'Queja registrada correctamente');
      setQuejasModalVisible(false);
      fetchQuejasCliente();
    } catch (error) {
      console.error('Error enviando queja:', error);
      Alert.alert('Error', error.message || 'No se pudo enviar la queja');
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurantes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/restaurantes`);
      if (!response.ok) throw new Error('Error al obtener restaurantes');
      const data = await response.json();
      setRestaurantes(data);
    } catch (error) {
      console.error('Error fetching restaurantes:', error);
      Alert.alert('Error', 'No se pudieron cargar los restaurantes');
    } finally {
      setLoading(false);
    }
  };

  const fetchCombosByRestaurante = async (restauranteId) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/restaurantes/${restauranteId}/combos`);
      if (!response.ok) throw new Error('Error al obtener combos');
      const data = await response.json();
      setCombos(data);
    } catch (error) {
      console.error('Error fetching combos:', error);
      Alert.alert('Error', 'No se pudieron cargar los combos del restaurante');
    } finally {
      setLoading(false);
    }
  };

  const fetchPedidosCliente = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/clientes/${cliente.cedula}/pedidos`);
      if (!response.ok) throw new Error('Error al obtener pedidos');
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error('Error fetching pedidos:', error);
      Alert.alert('Error', 'No se pudo cargar el historial de pedidos');
    } finally {
      setLoading(false);
    }
  };

  const handleRestauranteSelect = (restaurante) => {
    setSelectedRestaurante(restaurante);
    setSelectedCombos([]);
    setModalVisible(true);
  };

  const handleComboSelect = (combo) => {
    setSelectedCombos(prev => {
      const existingIndex = prev.findIndex(item => item.id === combo.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].cantidad += 1;
        return updated;
      } else {
        return [...prev, { ...combo, cantidad: 1 }];
      }
    });
  };

  const removeCombo = (comboId) => {
    setSelectedCombos(prev => {
      const existingIndex = prev.findIndex(item => item.id === comboId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        if (updated[existingIndex].cantidad > 1) {
          updated[existingIndex].cantidad -= 1;
          return updated;
        } else {
          return updated.filter(item => item.id !== comboId);
        }
      }
      return prev;
    });
  };

  const realizarPedido = async () => {
    if (selectedCombos.length === 0) {
      Alert.alert('Error', 'Debes seleccionar al menos un combo');
      return;
    }

    try {
      setLoading(true);
      
      const pedidoData = {
        clienteId: cliente.cedula,
        restauranteId: selectedRestaurante.cedulaJuridica,
        estado: "EN_PREPARACION",
        subtotal: subtotal,
        costoTransporte: costoTransporte,
        direccion: cliente.direccion
      };

      const pedidoResponse = await fetch(`${BASE_URL}/api/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData)
      });
      
      if (!pedidoResponse.ok) {
        const errorData = await pedidoResponse.json();
        throw new Error(errorData.mensaje || 'Error al crear el pedido');
      }
      
      const pedidoCreado = await pedidoResponse.json();

      for (const combo of selectedCombos) {
        const pedidoComboData = {
          comboId: combo.id,
          cantidad: combo.cantidad,
          precioUnit: combo.precio
        };

        const comboResponse = await fetch(`${BASE_URL}/api/pedidos/${pedidoCreado.id}/combos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pedidoComboData)
        });

        if (!comboResponse.ok) {
          const errorData = await comboResponse.json();
          throw new Error(errorData.mensaje || `Error al agregar combo ${combo.id} al pedido`);
        }
      }
      
      Alert.alert('Éxito', 'Pedido realizado correctamente');
      setModalVisible(false);
      setSelectedCombos([]);
      fetchPedidosCliente();
    } catch (error) {
      console.error('Error completo realizando pedido:', error);
      Alert.alert('Error', error.message || 'No se pudo completar el pedido. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CR', { 
      style: 'currency', 
      currency: 'CRC',
      minimumFractionDigits: 2
    }).format(value);
  };

  const renderRestauranteItem = ({ item }) => (
  <TouchableOpacity 
    style={[
      localStyles.restauranteCard,
      isMobile ? localStyles.mobileRestauranteCard : localStyles.desktopRestauranteCard
    ]}
    onPress={() => handleRestauranteSelect(item)}
  >
    <Text style={localStyles.restauranteNombre}>{item.nombre}</Text>
    <Text style={localStyles.restauranteInfo}>{item.direccion}</Text>
    <Text style={localStyles.restauranteInfo}>Tipo: {item.tipoComida}</Text>
  </TouchableOpacity>
);

  const renderComboItem = ({ item }) => (
    <View style={[
      localStyles.comboCard,
      isMobile ? localStyles.comboCardMobile : localStyles.comboCardDesktop
    ]}>
      <Text style={localStyles.comboNombre}>{item.nombre}</Text>
      <Text style={localStyles.comboDescripcion}>{item.descripcion}</Text>
      <Text style={localStyles.comboPrecio}>{formatCurrency(item.precio)}</Text>
      
      <View style={localStyles.comboActions}>
        <TouchableOpacity 
          style={localStyles.actionButton} 
          onPress={() => removeCombo(item.id)}
          disabled={!selectedCombos.some(c => c.id === item.id)}
        >
          <Text style={localStyles.actionButtonText}>-</Text>
        </TouchableOpacity>
        
        <Text style={localStyles.comboCantidad}>
          {selectedCombos.find(c => c.id === item.id)?.cantidad || 0}
        </Text>
        
        <TouchableOpacity 
          style={localStyles.actionButton} 
          onPress={() => handleComboSelect(item)}
        >
          <Text style={localStyles.actionButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPedidoItem = ({ item }) => (
    <View style={[
      localStyles.pedidoCard,
      isMobile ? localStyles.pedidoCardMobile : localStyles.pedidoCardDesktop
    ]}>
      <Text style={localStyles.pedidoTitle}>Pedido #{item.id}</Text>
      <Text style={localStyles.pedidoInfo}>Estado: {item.estado}</Text>
      <Text style={localStyles.pedidoInfo}>Fecha: {new Date(item.fechaPedido).toLocaleString()}</Text>
      <Text style={localStyles.pedidoInfo}>Total: {formatCurrency(item.total)}</Text>
      
      {item.estado === 'ENTREGADO' && (
        <TouchableOpacity 
          style={localStyles.quejaButton}
          onPress={() => abrirModalQueja(item)}
        >
          <Text style={localStyles.quejaButtonText}>Calificar/Quejar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={isMobile ? localStyles.mobileContainer : localStyles.desktopContainer}>
      {/* Sidebar en desktop */}
      {!isMobile && (
        <View style={localStyles.sidebar}>
          <View style={localStyles.profileSection}>
            <Text style={localStyles.welcomeText}>Bienvenido</Text>
            <Text style={localStyles.userName}>{cliente.nombre}</Text>
            <Text style={localStyles.userAddress}>{cliente.direccion}</Text>
          </View>
          
          <TouchableOpacity 
            style={localStyles.sidebarButton}
            onPress={() => setPedidosModalVisible(true)}
          >
            <Text style={localStyles.sidebarButtonText}>Mis Pedidos ({pedidos.length})</Text>
          </TouchableOpacity>
          
          <AuthButton 
            title="Cerrar sesión" 
            onPress={onLogout}
            style={localStyles.logoutButton}
            textStyle={localStyles.logoutButtonText}
          />
        </View>
      )}

      {/* Contenido principal */}
      <View style={isMobile ? localStyles.mobileContent : localStyles.desktopContent}>
        {/* Header en móvil */}
        {isMobile && (
          <View style={localStyles.mobileHeader}>
            <Text style={localStyles.mobileWelcome}>Hola {cliente.nombre}</Text>
            <Text style={localStyles.mobileAddress}>{cliente.direccion}</Text>
            
            <View style={localStyles.mobileButtons}>
              <TouchableOpacity 
                style={localStyles.mobileHistorialButton}
                onPress={() => setPedidosModalVisible(true)}
              >
                <Text style={localStyles.mobileButtonText}>Ver mis pedidos ({pedidos.length})</Text>
              </TouchableOpacity>
              
              <AuthButton 
                title="Cerrar sesión" 
                onPress={onLogout}
                style={localStyles.mobileLogoutButton}
                textStyle={localStyles.mobileButtonText}
              />
            </View>
          </View>
        )}

        {/* Lista de restaurantes */}
        {loading && !modalVisible && !pedidosModalVisible ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={restaurantes}
            renderItem={renderRestauranteItem}
            keyExtractor={item => item.cedulaJuridica}
            contentContainerStyle={isMobile ? localStyles.mobileListContainer : localStyles.desktopListContainer}
            ListEmptyComponent={
              <Text style={localStyles.emptyText}>No hay restaurantes disponibles</Text>
            }
            numColumns={isMobile ? 1 : 3} // 1 columna en móvil, 3 en desktop
            columnWrapperStyle={!isMobile ? localStyles.desktopColumnWrapper : null}
          />
        )}
      </View>
      
      {/* Modal para seleccionar combos */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[
          localStyles.modalContainer,
          isMobile ? localStyles.modalContainerMobile : localStyles.modalContainerDesktop
        ]}>
          <View style={localStyles.modalHeader}>
            <TouchableOpacity 
              style={localStyles.backButton}
              onPress={() => {
                setModalVisible(false);
                setSelectedCombos([]);
              }}
            >
              <Text style={localStyles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={localStyles.modalTitle}>{selectedRestaurante?.nombre}</Text>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <FlatList
                data={combos}
                renderItem={renderComboItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={localStyles.listContainer}
                ListEmptyComponent={
                  <Text style={localStyles.emptyText}>Este restaurante no tiene combos disponibles</Text>
                }
                numColumns={isMobile ? 1 : 2} // Mostrar 2 columnas en desktop
              />
              
              <View style={[
                localStyles.summaryContainer,
                isMobile ? localStyles.summaryContainerMobile : localStyles.summaryContainerDesktop
              ]}>
                <View style={localStyles.summaryRow}>
                  <Text style={localStyles.summaryLabel}>Subtotal:</Text>
                  <Text style={localStyles.summaryValue}>{formatCurrency(subtotal)}</Text>
                </View>
                <View style={localStyles.summaryRow}>
                  <Text style={localStyles.summaryLabel}>Costo de envío:</Text>
                  <Text style={localStyles.summaryValue}>{formatCurrency(costoTransporte)}</Text>
                </View>
                <View style={localStyles.summaryRow}>
                  <Text style={localStyles.summaryLabel}>IVA (13%):</Text>
                  <Text style={localStyles.summaryValue}>{formatCurrency(subtotal * 0.13)}</Text>
                </View>
                <View style={[localStyles.summaryRow, localStyles.totalRow]}>
                  <Text style={[localStyles.summaryLabel, localStyles.totalLabel]}>Total:</Text>
                  <Text style={[localStyles.summaryValue, localStyles.totalValue]}>
                    {formatCurrency(subtotal + costoTransporte + (subtotal * 0.13))}
                  </Text>
                </View>
              </View>
              
              <View style={[
                localStyles.modalButtons,
                isMobile ? localStyles.modalButtonsMobile : localStyles.modalButtonsDesktop
              ]}>
                <TouchableOpacity 
                  style={[localStyles.modalButton, localStyles.cancelButton]}
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedCombos([]);
                  }}
                  disabled={loading}
                >
                  <Text style={localStyles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[localStyles.modalButton, localStyles.confirmButton]}
                  onPress={realizarPedido}
                  disabled={loading || selectedCombos.length === 0}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={localStyles.modalButtonText}>Realizar Pedido</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>
      
      {/* Modal para ver pedidos */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={pedidosModalVisible}
        onRequestClose={() => setPedidosModalVisible(false)}
      >
        <View style={[
          localStyles.modalContainer,
          isMobile ? localStyles.modalContainerMobile : localStyles.modalContainerDesktop
        ]}>
          <View style={localStyles.modalHeader}>
            <TouchableOpacity 
              style={localStyles.backButton}
              onPress={() => setPedidosModalVisible(false)}
            >
              <Text style={localStyles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={localStyles.modalTitle}>Mis Pedidos</Text>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {pedidos.length === 0 ? (
                <Text style={localStyles.noPedidosText}>No has realizado ningún pedido aún</Text>
              ) : (
                <FlatList
                  data={pedidos}
                  renderItem={renderPedidoItem}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={localStyles.listContainer}
                  numColumns={isMobile ? 1 : 2} // Mostrar 2 columnas en desktop
                />
              )}
            </>
          )}
        </View>
      </Modal>

      {/* Modal para quejas */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={quejasModalVisible}
        onRequestClose={() => setQuejasModalVisible(false)}
      >
        <View style={[
          localStyles.modalContainer,
          isMobile ? localStyles.modalContainerMobile : localStyles.modalContainerDesktop
        ]}>
          <View style={localStyles.modalHeader}>
            <TouchableOpacity 
              style={localStyles.backButton}
              onPress={() => setQuejasModalVisible(false)}
            >
              <Text style={localStyles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={localStyles.modalTitle}>Calificar Pedido #{selectedPedido?.id}</Text>
          </View>

          <View style={[
            localStyles.quejaFormContainer,
            isMobile ? localStyles.quejaFormContainerMobile : localStyles.quejaFormContainerDesktop
          ]}>
            {selectedPedido?.repartidorId && (
              <View style={localStyles.inputContainer}>
                <Text style={localStyles.inputLabel}>Repartidor ID:</Text>
                <TextInput
                  style={localStyles.input}
                  value={repartidorId}
                  onChangeText={setRepartidorId}
                  editable={false}
                />
              </View>
            )}

            <View style={localStyles.inputContainer}>
              <Text style={localStyles.inputLabel}>Descripción de la queja:</Text>
              <TextInput
                style={[localStyles.input, localStyles.textArea]}
                multiline
                numberOfLines={4}
                value={descripcionQueja}
                onChangeText={setDescripcionQueja}
                placeholder="Describe tu experiencia con el pedido..."
              />
            </View>

            <TouchableOpacity 
              style={[localStyles.modalButton, localStyles.confirmButton]}
              onPress={enviarQueja}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={localStyles.modalButtonText}>Enviar Queja</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para ver quejas existentes */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={quejasModalVisible}
        onRequestClose={() => setQuejasModalVisible(false)}
      >
        <View style={[
          localStyles.modalContainer,
          isMobile ? localStyles.modalContainerMobile : localStyles.modalContainerDesktop
        ]}>
          <View style={localStyles.modalHeader}>
            <TouchableOpacity 
              style={localStyles.backButton}
              onPress={() => setQuejasModalVisible(false)}
            >
              <Text style={localStyles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={localStyles.modalTitle}>Mis Quejas</Text>
          </View>

          {quejasCliente.length === 0 ? (
            <Text style={localStyles.noItemsText}>No has registrado quejas aún</Text>
          ) : (
            <FlatList
              data={quejasCliente}
              renderItem={({ item }) => (
                <View style={[
                  localStyles.quejaCard,
                  isMobile ? localStyles.quejaCardMobile : localStyles.quejaCardDesktop
                ]}>
                  <Text style={localStyles.quejaTitle}>Queja #{item.id}</Text>
                  <Text style={localStyles.quejaInfo}>Repartidor: {item.repartidorId}</Text>
                  <Text style={localStyles.quejaInfo}>Fecha: {new Date(item.fechaQueja).toLocaleDateString()}</Text>
                  <Text style={localStyles.quejaDescripcion}>{item.descripcion}</Text>
                </View>
              )}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={localStyles.listContainer}
              numColumns={isMobile ? 1 : 2} // Mostrar 2 columnas en desktop
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  // Contenedores principales
  mobileContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },

  // Sidebar desktop
  sidebar: {
    width: 250,
    backgroundColor: '#2c3e50',
    padding: 20,
    justifyContent: 'flex-start',
  },
  profileSection: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
    paddingBottom: 20,
  },
  welcomeText: {
    color: '#ecf0f1',
    fontSize: 16,
    marginBottom: 5,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userAddress: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  sidebarButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  sidebarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    marginTop: 'auto',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#fff',
  },

  // Contenido principal
  mobileContent: {
    flex: 1,
    padding: 10,
  },
  desktopContent: {
    flex: 1,
    padding: 20,
  },

  // Header móvil
  mobileHeader: {
    marginBottom: 20,
  },
  mobileWelcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  mobileAddress: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  mobileButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  mobileHistorialButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  mobileLogoutButton: {
    flex: 1,
  },
  mobileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Listas
  mobileListContainer: {
    paddingBottom: 20,
  },
  desktopListContainer: {
    padding: 10,
  },
  desktopColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  // Tarjetas de restaurante
  restauranteCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }
    }),
  },
  mobileRestauranteCard: {
    width: '100%',
    marginBottom: 10,
  },
  desktopRestauranteCard: {
    width: '32%',
    marginBottom: 15,
  },
  restauranteNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  restauranteInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },

  // Texto vacío
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d',
  },
  
  // Estilos para móvil
  containerMobile: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonsContainerMobile: {
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  historialButtonMobile: {
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonMobile: {
    width: '100%',
  },
  listContentContainer: {
    flex: 1,
  },
  listContainerMobile: {
    paddingHorizontal: 5,
  },
  restauranteCardMobile: {
    width: '100%',
    marginHorizontal: 0,
  },
  
  // Estilos para desktop
  containerDesktop: {
    flex: 1,
    padding: 20,
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
  },
  headerContainerDesktop: {
    maxWidth: 800,
    marginHorizontal: 'auto',
    width: '100%',
    marginBottom: 20,
  },
  buttonsContainerDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 800,
    marginHorizontal: 'auto',
    marginBottom: 20,
    width: '100%',
  },
  historialButtonDesktop: {
    width: '48%',
  },
  logoutButtonDesktop: {
    width: '48%',
  },
  listContainerDesktop: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  restauranteCardDesktop: {
    width: '48%',
    marginHorizontal: 0,
    marginBottom: 15,
  },
  
  // Estilos compartidos
  restauranteCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restauranteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  restauranteInfo: {
    fontSize: 14,
    color: '#666',
  },
  historialButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historialButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
  },
  
  
  // Estilos para móvil
  containerMobile: {
    padding: 10,
  },
  restauranteCardMobile: {
    width: '100%',
    marginHorizontal: 0,
  },
  comboCardMobile: {
    width: '100%',
    marginHorizontal: 0,
  },
  pedidoCardMobile: {
    width: '100%',
    marginHorizontal: 0,
  },
  modalContainerMobile: {
    padding: 10,
  },
  summaryContainerMobile: {
    padding: 15,
  },
  modalButtonsMobile: {
    padding: 10,
  },
  quejaFormContainerMobile: {
    padding: 15,
  },
  quejaCardMobile: {
    width: '100%',
    marginHorizontal: 0,
  },
  buttonsContainerMobile: {
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 0,
  },
  listContainerMobile: {
    paddingHorizontal: 5,
  },
  
  // Estilos para desktop
  containerDesktop: {
    padding: 20,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  restauranteCardDesktop: {
    width: '48%',
    marginHorizontal: '1%',
  },
  comboCardDesktop: {
    width: '48%',
    marginHorizontal: '1%',
  },
  pedidoCardDesktop: {
    width: '48%',
    marginHorizontal: '1%',
  },
  modalContainerDesktop: {
    padding: 20,
    maxWidth: 1000,
    marginHorizontal: 'auto',
  },
  summaryContainerDesktop: {
    padding: 20,
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  modalButtonsDesktop: {
    padding: 20,
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  quejaFormContainerDesktop: {
    padding: 20,
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  quejaCardDesktop: {
    width: '48%',
    marginHorizontal: '1%',
  },
  buttonsContainerDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 800,
    marginHorizontal: 'auto',
    marginBottom: 20,
  },
  listContainerDesktop: {
    paddingHorizontal: 10,
  },
  
  // Estilos compartidos
  restauranteCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restauranteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  restauranteInfo: {
    fontSize: 14,
    color: '#666',
  },
  comboCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comboNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  comboDescripcion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  comboPrecio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 10,
  },
  comboActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
    alignSelf: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  comboCantidad: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#3498db',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalLabel: {
    fontSize: 18,
    color: '#2c3e50',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  confirmButton: {
    backgroundColor: '#2ecc71',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noPedidosText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pedidoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  pedidoInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  buttonsContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  historialButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  historialButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
  },
  quejaButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  quejaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quejaFormContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  quejaCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quejaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  quejaInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  quejaDescripcion: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    fontStyle: 'italic',
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});