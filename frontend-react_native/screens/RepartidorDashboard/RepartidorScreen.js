import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Modal, StyleSheet, Platform, ActivityIndicator, Alert, TextInput, Dimensions, RefreshControl } from 'react-native';
import AuthButton from '../../components/AuthButton';

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

const { width, height } = Dimensions.get('window');
const isMobile = width < 768;

export default function RepartidorScreen({ repartidor, onLogout }) {
  const [pedidosDisponibles, setPedidosDisponibles] = useState([]);
  const [pedidosAsignados, setPedidosAsignados] = useState([]);
  const [pedidosHistorial, setPedidosHistorial] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [historialModalVisible, setHistorialModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('disponibles'); // 'disponibles', 'asignados', 'historial'

  useEffect(() => {
    fetchPedidosDisponibles();
    fetchPedidosAsignados();
    fetchPedidosHistorial();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchPedidosDisponibles(),
        fetchPedidosAsignados(),
        fetchPedidosHistorial()
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchPedidosDisponibles = async () => {
  try {
    setLoading(true);
    // Cambiamos a usar el endpoint por estado
    const response = await fetch(`${BASE_URL}/api/pedidos/estado/EN_PREPARACION`);
    if (!response.ok) throw new Error('Error al obtener pedidos disponibles');
    const data = await response.json();
    
    // Filtramos solo pedidos sin repartidor asignado
    const pedidosSinRepartidor = data.filter(pedido => !pedido.repartidorId);
    setPedidosDisponibles(pedidosSinRepartidor);
  } catch (error) {
    console.error('Error fetching pedidos disponibles:', error);
    Alert.alert('Error', 'No se pudieron cargar los pedidos disponibles');
  } finally {
    setLoading(false);
  }
};

const fetchPedidosAsignados = async () => {
  try {
    setLoading(true);
    // Usamos el endpoint que obtiene pedidos por repartidor
    const response = await fetch(`${BASE_URL}/api/repartidores/${repartidor.cedula}/pedidos`);
    if (!response.ok) throw new Error('Error al obtener pedidos asignados');
    const data = await response.json();
    
    // Filtramos solo pedidos no entregados
    const pedidosActivos = data.filter(pedido => pedido.estado !== 'ENTREGADO');
    setPedidosAsignados(pedidosActivos);
  } catch (error) {
    console.error('Error fetching pedidos asignados:', error);
    Alert.alert('Error', 'No se pudieron cargar los pedidos asignados');
  } finally {
    setLoading(false);
  }
};

const fetchPedidosHistorial = async () => {
  try {
    setLoading(true);
    // Usamos el mismo endpoint pero filtramos por estado ENTREGADO
    const response = await fetch(`${BASE_URL}/api/repartidores/${repartidor.cedula}/pedidos`);
    if (!response.ok) throw new Error('Error al obtener historial de pedidos');
    const data = await response.json();
    
    const historial = data.filter(pedido => pedido.estado === 'ENTREGADO');
    setPedidosHistorial(historial);
  } catch (error) {
    console.error('Error fetching historial de pedidos:', error);
    Alert.alert('Error', 'No se pudo cargar el historial de pedidos');
  } finally {
    setLoading(false);
  }
};

  const aceptarPedido = async (pedidoId) => {
  try {
    setLoading(true);
    
    // Primero obtenemos el pedido actual
    const responseGet = await fetch(`${BASE_URL}/api/pedidos/${pedidoId}`);
    if (!responseGet.ok) throw new Error('No se pudo obtener el pedido para asignar');
    const pedidoActual = await responseGet.json();
    
    // Actualizamos el pedido con PUT
    const response = await fetch(`${BASE_URL}/api/pedidos/${pedidoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...pedidoActual, // Mantenemos todos los datos
        repartidorId: repartidor.cedula,
        estado: 'EN_CAMINO',
        fechaPedido: pedidoActual.fechaPedido || new Date().toISOString()
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || 'Error al aceptar el pedido');
    }

    Alert.alert('Éxito', 'Pedido aceptado correctamente');
    
    // Actualizamos las listas
    await Promise.all([
      fetchPedidosDisponibles(),
      fetchPedidosAsignados()
    ]);
  } catch (error) {
    console.error('Error aceptando pedido:', error);
    Alert.alert('Error', error.message || 'No se pudo aceptar el pedido');
  } finally {
    setLoading(false);
  }
};

  const rechazarPedido = async (pedidoId) => {
  try {
    setLoading(true);
    
    // Simplemente no hacemos nada (el pedido queda disponible para otro repartidor)
    Alert.alert('Info', 'Pedido rechazado, quedará disponible para otro repartidor');
    
    // Actualizamos la lista de disponibles
    await fetchPedidosDisponibles();
  } catch (error) {
    console.error('Error rechazando pedido:', error);
    Alert.alert('Error', 'No se pudo rechazar el pedido');
  } finally {
    setLoading(false);
  }
};

  const actualizarEstadoPedido = async (pedidoId, nuevoEstado) => {
  try {
    setLoading(true);
    
    // Obtenemos el pedido actual primero
    const responseGet = await fetch(`${BASE_URL}/api/pedidos/${pedidoId}`);
    if (!responseGet.ok) throw new Error('No se pudo obtener el pedido');
    const pedidoActual = await responseGet.json();
    
    // Actualizamos el estado
    const response = await fetch(`${BASE_URL}/api/pedidos/${pedidoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...pedidoActual,
        estado: nuevoEstado,
        fechaEntrega: nuevoEstado === 'ENTREGADO' ? new Date().toISOString() : null
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || 'Error al actualizar estado del pedido');
    }

    Alert.alert('Éxito', 'Estado del pedido actualizado correctamente');
    
    // Actualizamos las listas afectadas
    await Promise.all([
      fetchPedidosAsignados(),
      fetchPedidosHistorial()
    ]);
    
    setModalVisible(false);
  } catch (error) {
    console.error('Error actualizando estado del pedido:', error);
    Alert.alert('Error', error.message || 'No se pudo actualizar el estado del pedido');
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderPedidoDisponibleItem = ({ item }) => (
    <View style={[
      localStyles.pedidoCard,
      isMobile ? localStyles.pedidoCardMobile : localStyles.pedidoCardDesktop
    ]}>
      <Text style={localStyles.pedidoTitle}>Pedido #{item.id}</Text>
      <Text style={localStyles.pedidoInfo}>Restaurante: {item.restauranteNombre}</Text>
      <Text style={localStyles.pedidoInfo}>Dirección: {item.direccion}</Text>
      <Text style={localStyles.pedidoInfo}>Total: {formatCurrency(item.total)}</Text>
      
      <View style={localStyles.buttonsContainer}>
        <TouchableOpacity 
          style={[localStyles.actionButton, localStyles.aceptarButton]}
          onPress={() => aceptarPedido(item.id)}
          disabled={loading}
        >
          <Text style={localStyles.actionButtonText}>Aceptar Pedido</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[localStyles.actionButton, localStyles.rechazarButton]}
          onPress={() => rechazarPedido(item.id)}
          disabled={loading}
        >
          <Text style={localStyles.actionButtonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPedidoAsignadoItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        localStyles.pedidoCard,
        isMobile ? localStyles.pedidoCardMobile : localStyles.pedidoCardDesktop
      ]}
      onPress={() => {
        setSelectedPedido(item);
        setModalVisible(true);
      }}
    >
      <Text style={localStyles.pedidoTitle}>Pedido #{item.id}</Text>
      <Text style={localStyles.pedidoInfo}>Restaurante: {item.restauranteNombre}</Text>
      <Text style={localStyles.pedidoInfo}>Cliente: {item.clienteNombre}</Text>
      <Text style={localStyles.pedidoInfo}>Dirección: {item.direccion}</Text>
      <Text style={localStyles.pedidoInfo}>Total: {formatCurrency(item.total)}</Text>
      <Text style={[
        localStyles.pedidoEstado,
        item.estado === 'EN_CAMINO' ? localStyles.estadoEnCamino :
        item.estado === 'ENTREGADO' ? localStyles.estadoEntregado :
        localStyles.estadoEnPreparacion
      ]}>
        {item.estado.replace('_', ' ')}
      </Text>
    </TouchableOpacity>
  );

  const renderPedidoHistorialItem = ({ item }) => (
    <View style={[
      localStyles.pedidoCard,
      isMobile ? localStyles.pedidoCardMobile : localStyles.pedidoCardDesktop
    ]}>
      <Text style={localStyles.pedidoTitle}>Pedido #{item.id}</Text>
      <Text style={localStyles.pedidoInfo}>Restaurante: {item.restauranteNombre}</Text>
      <Text style={localStyles.pedidoInfo}>Cliente: {item.clienteNombre}</Text>
      <Text style={localStyles.pedidoInfo}>Fecha: {formatDate(item.fechaPedido)}</Text>
      <Text style={localStyles.pedidoInfo}>Total: {formatCurrency(item.total)}</Text>
      <Text style={[
        localStyles.pedidoEstado,
        item.estado === 'ENTREGADO' ? localStyles.estadoEntregado :
        item.estado === 'CANCELADO' ? localStyles.estadoCancelado :
        localStyles.estadoOtro
      ]}>
        {item.estado.replace('_', ' ')}
      </Text>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'disponibles':
        return (
          <FlatList
            data={pedidosDisponibles}
            renderItem={renderPedidoDisponibleItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={isMobile ? localStyles.mobileListContainer : localStyles.desktopListContainer}
            ListEmptyComponent={
              <Text style={localStyles.emptyText}>No hay pedidos disponibles actualmente</Text>
            }
            numColumns={isMobile ? 1 : 2}
            columnWrapperStyle={!isMobile ? localStyles.desktopColumnWrapper : null}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        );
      case 'asignados':
        return (
          <FlatList
            data={pedidosAsignados}
            renderItem={renderPedidoAsignadoItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={isMobile ? localStyles.mobileListContainer : localStyles.desktopListContainer}
            ListEmptyComponent={
              <Text style={localStyles.emptyText}>No tienes pedidos asignados actualmente</Text>
            }
            numColumns={isMobile ? 1 : 2}
            columnWrapperStyle={!isMobile ? localStyles.desktopColumnWrapper : null}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        );
      case 'historial':
        return (
          <FlatList
            data={pedidosHistorial}
            renderItem={renderPedidoHistorialItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={isMobile ? localStyles.mobileListContainer : localStyles.desktopListContainer}
            ListEmptyComponent={
              <Text style={localStyles.emptyText}>No tienes pedidos en tu historial</Text>
            }
            numColumns={isMobile ? 1 : 2}
            columnWrapperStyle={!isMobile ? localStyles.desktopColumnWrapper : null}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={isMobile ? localStyles.mobileContainer : localStyles.desktopContainer}>
      {/* Sidebar en desktop */}
      {!isMobile && (
        <View style={localStyles.sidebar}>
          <View style={localStyles.profileSection}>
            <Text style={localStyles.welcomeText}>Bienvenido</Text>
            <Text style={localStyles.userName}>{repartidor.nombre}</Text>
            <Text style={localStyles.userInfo}>Cédula: {repartidor.cedula}</Text>
            <Text style={localStyles.userInfo}>Vehículo: {repartidor.tipoVehiculo}</Text>
          </View>
          
          <TouchableOpacity 
            style={[localStyles.sidebarButton, activeTab === 'disponibles' && localStyles.activeTab]}
            onPress={() => setActiveTab('disponibles')}
          >
            <Text style={localStyles.sidebarButtonText}>Pedidos Disponibles ({pedidosDisponibles.length})</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[localStyles.sidebarButton, activeTab === 'asignados' && localStyles.activeTab]}
            onPress={() => setActiveTab('asignados')}
          >
            <Text style={localStyles.sidebarButtonText}>Mis Pedidos ({pedidosAsignados.length})</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[localStyles.sidebarButton, activeTab === 'historial' && localStyles.activeTab]}
            onPress={() => setActiveTab('historial')}
          >
            <Text style={localStyles.sidebarButtonText}>Historial ({pedidosHistorial.length})</Text>
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
            <Text style={localStyles.mobileWelcome}>Hola {repartidor.nombre}</Text>
            <Text style={localStyles.mobileInfo}>Cédula: {repartidor.cedula}</Text>
            <Text style={localStyles.mobileInfo}>Vehículo: {repartidor.tipoVehiculo}</Text>
            
            <View style={localStyles.tabContainer}>
              <TouchableOpacity 
                style={[localStyles.tabButton, activeTab === 'disponibles' && localStyles.activeTab]}
                onPress={() => setActiveTab('disponibles')}
              >
                <Text style={localStyles.tabButtonText}>Disponibles ({pedidosDisponibles.length})</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[localStyles.tabButton, activeTab === 'asignados' && localStyles.activeTab]}
                onPress={() => setActiveTab('asignados')}
              >
                <Text style={localStyles.tabButtonText}>Mis Pedidos ({pedidosAsignados.length})</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[localStyles.tabButton, activeTab === 'historial' && localStyles.activeTab]}
                onPress={() => setActiveTab('historial')}
              >
                <Text style={localStyles.tabButtonText}>Historial ({pedidosHistorial.length})</Text>
              </TouchableOpacity>
            </View>
            
            <AuthButton 
              title="Cerrar sesión" 
              onPress={onLogout}
              style={localStyles.mobileLogoutButton}
              textStyle={localStyles.mobileButtonText}
            />
          </View>
        )}

        {/* Contenido según pestaña seleccionada */}
        {loading && !modalVisible ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderContent()
        )}
      </View>
      
      {/* Modal para detalles del pedido y actualización de estado */}
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
              onPress={() => setModalVisible(false)}
            >
              <Text style={localStyles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={localStyles.modalTitle}>Pedido #{selectedPedido?.id}</Text>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {selectedPedido && (
                <ScrollView style={localStyles.modalContent}>
                  <View style={localStyles.detailSection}>
                    <Text style={localStyles.detailTitle}>Información del Pedido</Text>
                    <View style={localStyles.detailRow}>
                      <Text style={localStyles.detailLabel}>Restaurante:</Text>
                      <Text style={localStyles.detailValue}>{selectedPedido.restauranteNombre}</Text>
                    </View>
                    <View style={localStyles.detailRow}>
                      <Text style={localStyles.detailLabel}>Cliente:</Text>
                      <Text style={localStyles.detailValue}>{selectedPedido.clienteNombre}</Text>
                    </View>
                    <View style={localStyles.detailRow}>
                      <Text style={localStyles.detailLabel}>Dirección:</Text>
                      <Text style={localStyles.detailValue}>{selectedPedido.direccion}</Text>
                    </View>
                    <View style={localStyles.detailRow}>
                      <Text style={localStyles.detailLabel}>Fecha:</Text>
                      <Text style={localStyles.detailValue}>{formatDate(selectedPedido.fechaPedido)}</Text>
                    </View>
                    <View style={localStyles.detailRow}>
                      <Text style={localStyles.detailLabel}>Estado:</Text>
                      <Text style={[
                        localStyles.detailValue,
                        selectedPedido.estado === 'EN_CAMINO' ? localStyles.estadoEnCamino :
                        selectedPedido.estado === 'ENTREGADO' ? localStyles.estadoEntregado :
                        localStyles.estadoEnPreparacion
                      ]}>
                        {selectedPedido.estado.replace('_', ' ')}
                      </Text>
                    </View>
                  </View>

                  <View style={localStyles.detailSection}>
                    <Text style={localStyles.detailTitle}>Combos</Text>
                    {selectedPedido.combos && selectedPedido.combos.length > 0 ? (
                      selectedPedido.combos.map((combo, index) => (
                        <View key={index} style={localStyles.comboDetailRow}>
                          <Text style={localStyles.comboDetailName}>{combo.cantidad}x {combo.comboNombre}</Text>
                          <Text style={localStyles.comboDetailPrice}>{formatCurrency(combo.precioUnit * combo.cantidad)}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={localStyles.emptyText}>No hay combos en este pedido</Text>
                    )}
                  </View>

                  <View style={localStyles.detailSection}>
                    <Text style={localStyles.detailTitle}>Resumen de Pago</Text>
                    <View style={localStyles.summaryRow}>
                      <Text style={localStyles.summaryLabel}>Subtotal:</Text>
                      <Text style={localStyles.summaryValue}>{formatCurrency(selectedPedido.subtotal)}</Text>
                    </View>
                    <View style={localStyles.summaryRow}>
                      <Text style={localStyles.summaryLabel}>Costo de envío:</Text>
                      <Text style={localStyles.summaryValue}>{formatCurrency(selectedPedido.costoTransporte)}</Text>
                    </View>
                    <View style={localStyles.summaryRow}>
                      <Text style={localStyles.summaryLabel}>IVA (13%):</Text>
                      <Text style={localStyles.summaryValue}>{formatCurrency(selectedPedido.subtotal * 0.13)}</Text>
                    </View>
                    <View style={[localStyles.summaryRow, localStyles.totalRow]}>
                      <Text style={[localStyles.summaryLabel, localStyles.totalLabel]}>Total:</Text>
                      <Text style={[localStyles.summaryValue, localStyles.totalValue]}>
                        {formatCurrency(selectedPedido.total)}
                      </Text>
                    </View>
                  </View>

                  {selectedPedido.estado === 'EN_CAMINO' && (
                    <View style={localStyles.detailSection}>
                      <Text style={localStyles.detailTitle}>Acciones</Text>
                      <TouchableOpacity 
                        style={[localStyles.actionButton, localStyles.entregadoButton]}
                        onPress={() => actualizarEstadoPedido(selectedPedido.id, 'ENTREGADO')}
                        disabled={loading}
                      >
                        <Text style={localStyles.actionButtonText}>Marcar como Entregado</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </ScrollView>
              )}
            </>
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
  userInfo: {
    color: '#bdc3c7',
    fontSize: 14,
    marginBottom: 3,
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
  mobileInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  mobileButtons: {
    flexDirection: 'column',
    marginTop: 15,
  },
  mobileHistorialButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  mobileLogoutButton: {
    marginTop: 5,
  },
  mobileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Secciones
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    marginLeft: 10,
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

  // Tarjetas de pedidos
  pedidoCard: {
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
  pedidoCardMobile: {
    width: '100%',
    marginBottom: 10,
  },
  pedidoCardDesktop: {
    width: '48%',
    marginBottom: 15,
  },
  pedidoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  pedidoInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  pedidoEstado: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  estadoEnPreparacion: {
    color: '#f39c12', // Amarillo/naranja
  },
  estadoEnCamino: {
    color: '#3498db', // Azul
  },
  estadoEntregado: {
    color: '#2ecc71', // Verde
  },
  estadoCancelado: {
    color: '#e74c3c', // Rojo
  },
  estadoOtro: {
    color: '#7f8c8d', // Gris
  },

  // Texto vacío
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d',
  },
  
  // Modales
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalContainerMobile: {
    padding: 10,
  },
  modalContainerDesktop: {
    padding: 20,
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
  modalContent: {
    padding: 15,
  },
  
  // Detalles del pedido
  detailSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: '#7f8c8d',
    flex: 1,
  },
  detailValue: {
    fontSize: 15,
    color: '#2c3e50',
    flex: 2,
    textAlign: 'right',
  },
  comboDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  comboDetailName: {
    fontSize: 14,
    color: '#2c3e50',
  },
  comboDetailPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  
  // Resumen de pago
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
  
  // Formularios
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
  
  // Botones de acción
  buttonsContainer: {
    marginTop: 15,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  enCaminoButton: {
    backgroundColor: '#3498db',
  },
  entregadoButton: {
    backgroundColor: '#2ecc71',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Quejas
  quejaCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  quejaCardMobile: {
    width: '100%',
  },
  quejaCardDesktop: {
    width: '48%',
    marginRight: '2%',
  },
  quejaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  quejaInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  quejaDescripcion: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    fontStyle: 'italic',
  },

  // Nuevos estilos añadidos
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
    marginBottom: 5,
    minWidth: '30%',
    alignItems: 'center',
  },
  tabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  activeTab: {
    backgroundColor: '#2c3e50',
  },
  aceptarButton: {
    backgroundColor: '#2ecc71',
    marginBottom: 5,
  },
  rechazarButton: {
    backgroundColor: '#e74c3c',
  },
});