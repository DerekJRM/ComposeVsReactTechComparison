import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  Platform, 
  ActivityIndicator, 
  Alert, 
  TextInput, 
  Dimensions, 
  RefreshControl,
  Animated,
  Easing,
  Image
} from 'react-native';
import AuthButton from '../../components/AuthButton';
import styles from './RepartidorStyle';
import eatsLogo from '../../assets/eats_logo.png';

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
  const [activeTab, setActiveTab] = useState('disponibles');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    fetchPedidosDisponibles();
    fetchPedidosAsignados();
    fetchPedidosHistorial();
  }, []);

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(sidebarAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true
      }).start();
    }
  };

  const sidebarTranslateX = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0]
  });

  const overlayOpacity = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5]
  });

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
      const response = await fetch(`${BASE_URL}/api/pedidos/estado/EN_PREPARACION`);
      if (!response.ok) throw new Error('Error al obtener pedidos disponibles');
      const data = await response.json();
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
      const response = await fetch(`${BASE_URL}/api/repartidores/${repartidor.cedula}/pedidos`);
      if (!response.ok) throw new Error('Error al obtener pedidos asignados');
      const data = await response.json();
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
      const responseGet = await fetch(`${BASE_URL}/api/pedidos/${pedidoId}`);
      if (!responseGet.ok) throw new Error('No se pudo obtener el pedido para asignar');
      const pedidoActual = await responseGet.json();
      
      const response = await fetch(`${BASE_URL}/api/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...pedidoActual,
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
      Alert.alert('Info', 'Pedido rechazado, quedará disponible para otro repartidor');
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
      const responseGet = await fetch(`${BASE_URL}/api/pedidos/${pedidoId}`);
      if (!responseGet.ok) throw new Error('No se pudo obtener el pedido');
      const pedidoActual = await responseGet.json();
      
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
      styles.pedidoCard,
      isMobile ? styles.pedidoCardMobile : styles.pedidoCardDesktop
    ]}>
      <Text style={styles.pedidoTitle}>Pedido #{item.id}</Text>
      <Text style={styles.pedidoInfo}>Restaurante: {item.restauranteNombre}</Text>
      <Text style={styles.pedidoInfo}>Dirección: {item.direccion}</Text>
      <Text style={styles.pedidoInfo}>Total: {formatCurrency(item.total)}</Text>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.aceptarButton]}
          onPress={() => aceptarPedido(item.id)}
          disabled={loading}
        >
          <Text style={styles.actionButtonText}>Aceptar Pedido</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.rechazarButton]}
          onPress={() => rechazarPedido(item.id)}
          disabled={loading}
        >
          <Text style={styles.actionButtonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPedidoAsignadoItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.pedidoCard,
        isMobile ? styles.pedidoCardMobile : styles.pedidoCardDesktop
      ]}
      onPress={() => {
        setSelectedPedido(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.pedidoTitle}>Pedido #{item.id}</Text>
      <Text style={styles.pedidoInfo}>Restaurante: {item.restauranteNombre}</Text>
      <Text style={styles.pedidoInfo}>Cliente: {item.clienteNombre}</Text>
      <Text style={styles.pedidoInfo}>Dirección: {item.direccion}</Text>
      <Text style={styles.pedidoInfo}>Total: {formatCurrency(item.total)}</Text>
      <Text style={[
        styles.pedidoEstado,
        item.estado === 'EN_CAMINO' ? styles.estadoEnCamino :
        item.estado === 'ENTREGADO' ? styles.estadoEntregado :
        styles.estadoEnPreparacion
      ]}>
        {item.estado.replace('_', ' ')}
      </Text>
    </TouchableOpacity>
  );

  const renderPedidoHistorialItem = ({ item }) => (
    <View style={[
      styles.pedidoCard,
      isMobile ? styles.pedidoCardMobile : styles.pedidoCardDesktop
    ]}>
      <Text style={styles.pedidoTitle}>Pedido #{item.id}</Text>
      <Text style={styles.pedidoInfo}>Restaurante: {item.restauranteNombre}</Text>
      <Text style={styles.pedidoInfo}>Cliente: {item.clienteNombre}</Text>
      <Text style={styles.pedidoInfo}>Fecha: {formatDate(item.fechaPedido)}</Text>
      <Text style={styles.pedidoInfo}>Total: {formatCurrency(item.total)}</Text>
      <Text style={[
        styles.pedidoEstado,
        item.estado === 'ENTREGADO' ? styles.estadoEntregado :
        item.estado === 'CANCELADO' ? styles.estadoCancelado :
        styles.estadoOtro
      ]}>
        {item.estado.replace('_', ' ')}
      </Text>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'disponibles':
        return (
          <>
            <FlatList
              data={pedidosDisponibles}
              renderItem={renderPedidoDisponibleItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={isMobile ? styles.mobileListContainer : styles.desktopListContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No hay pedidos disponibles actualmente</Text>
              }
              numColumns={isMobile ? 1 : 2}
              columnWrapperStyle={!isMobile ? styles.desktopColumnWrapper : null}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
            {/* Logo centrado debajo de la lista solo en mobile */}
            {isMobile && (
              <View style={styles.logoContainer}>
                <Image 
                  source={eatsLogo} 
                  style={styles.mobileLogo}
                />
              </View>
            )}
          </>
        );
      case 'asignados':
        return (
          <>
            <FlatList
              data={pedidosAsignados}
              renderItem={renderPedidoAsignadoItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={isMobile ? styles.mobileListContainer : styles.desktopListContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No tienes pedidos asignados actualmente</Text>
              }
              numColumns={isMobile ? 1 : 2}
              columnWrapperStyle={!isMobile ? styles.desktopColumnWrapper : null}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
            {/* Logo centrado debajo de la lista solo en mobile */}
            {isMobile && (
              <View style={styles.logoContainer}>
                <Image 
                  source={eatsLogo} 
                  style={styles.mobileLogo}
                />
              </View>
            )}
          </>
        );
      case 'historial':
        return (
          <>
            <FlatList
              data={pedidosHistorial}
              renderItem={renderPedidoHistorialItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={isMobile ? styles.mobileListContainer : styles.desktopListContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No tienes pedidos en tu historial</Text>
              }
              numColumns={isMobile ? 1 : 2}
              columnWrapperStyle={!isMobile ? styles.desktopColumnWrapper : null}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
            {/* Logo centrado debajo de la lista solo en mobile */}
            {isMobile && (
              <View style={styles.logoContainer}>
                <Image 
                  source={eatsLogo} 
                  style={styles.mobileLogo}
                />
              </View>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      {!isMobile && (
        <View style={styles.sidebar}>
          <View style={styles.profileSection}>
            <Image 
              source={eatsLogo} 
              style={styles.sidebarLogo}
            />
            <Text style={styles.welcomeText}>Bienvenido</Text>
            <Text style={styles.userName}>{repartidor.nombre}</Text>
            <Text style={styles.userInfo}>Cédula: {repartidor.cedula}</Text>
            <Text style={styles.userInfo}>Vehículo: {repartidor.tipoVehiculo}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.sidebarButton, activeTab === 'disponibles' && styles.activeTab]}
            onPress={() => setActiveTab('disponibles')}
          >
            <Text style={styles.sidebarButtonText}>Pedidos Disponibles ({pedidosDisponibles.length})</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sidebarButton, activeTab === 'asignados' && styles.activeTab]}
            onPress={() => setActiveTab('asignados')}
          >
            <Text style={styles.sidebarButtonText}>Mis Pedidos ({pedidosAsignados.length})</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sidebarButton, activeTab === 'historial' && styles.activeTab]}
            onPress={() => setActiveTab('historial')}
          >
            <Text style={styles.sidebarButtonText}>Historial ({pedidosHistorial.length})</Text>
          </TouchableOpacity>
          
          <AuthButton 
            title="Cerrar sesión" 
            onPress={onLogout}
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </View>
      )}

      {isMobile && sidebarVisible && (
        <>
          <Animated.View 
            style={[
              styles.sidebarOverlay, 
              { opacity: overlayOpacity }
            ]} 
            onTouchEnd={toggleSidebar}
          />
          <Animated.View 
            style={[
              styles.mobileSidebar,
              { transform: [{ translateX: sidebarTranslateX }] }
            ]}
          >
            <View style={styles.profileSection}>
              <Image 
                source={eatsLogo} 
                style={styles.sidebarLogo}
              />
              <Text style={styles.welcomeText}>Bienvenido</Text>
              <Text style={styles.userName}>{repartidor.nombre}</Text>
              <Text style={styles.userInfo}>Cédula: {repartidor.cedula}</Text>
              <Text style={styles.userInfo}>Vehículo: {repartidor.tipoVehiculo}</Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.sidebarButton, activeTab === 'disponibles' && styles.activeTab]}
              onPress={() => {
                setActiveTab('disponibles');
                toggleSidebar();
              }}
            >
              <Text style={styles.sidebarButtonText}>Pedidos Disponibles ({pedidosDisponibles.length})</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.sidebarButton, activeTab === 'asignados' && styles.activeTab]}
              onPress={() => {
                setActiveTab('asignados');
                toggleSidebar();
              }}
            >
              <Text style={styles.sidebarButtonText}>Mis Pedidos ({pedidosAsignados.length})</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.sidebarButton, activeTab === 'historial' && styles.activeTab]}
              onPress={() => {
                setActiveTab('historial');
                toggleSidebar();
              }}
            >
              <Text style={styles.sidebarButtonText}>Historial ({pedidosHistorial.length})</Text>
            </TouchableOpacity>
            
            <AuthButton 
              title="Cerrar sesión" 
              onPress={onLogout}
              style={styles.logoutButton}
              textStyle={styles.logoutButtonText}
            />
          </Animated.View>
        </>
      )}

      <View style={isMobile ? styles.mobileContent : styles.desktopContent}>
        {isMobile && (
          <View style={styles.mobileHeader}>
          </View>
        )}

        {loading && !modalVisible ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderContent()
        )}
      </View>
      
      {isMobile && !sidebarVisible && (
        <TouchableOpacity 
          style={styles.sidebarToggleButton}
          onPress={toggleSidebar}
        >
          <Text style={styles.sidebarToggleButtonText}>☰</Text>
        </TouchableOpacity>
      )}
      
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[
          styles.modalContainer,
          isMobile ? styles.modalContainerMobile : styles.modalContainerDesktop
        ]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Pedido #{selectedPedido?.id}</Text>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {selectedPedido && (
                <ScrollView style={styles.modalContent}>
                  <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>Información del Pedido</Text>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Restaurante:</Text>
                      <Text style={styles.detailValue}>{selectedPedido.restauranteNombre}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Cliente:</Text>
                      <Text style={styles.detailValue}>{selectedPedido.clienteNombre}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Dirección:</Text>
                      <Text style={styles.detailValue}>{selectedPedido.direccion}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Fecha:</Text>
                      <Text style={styles.detailValue}>{formatDate(selectedPedido.fechaPedido)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Estado:</Text>
                      <Text style={[
                        styles.detailValue,
                        selectedPedido.estado === 'EN_CAMINO' ? styles.estadoEnCamino :
                        selectedPedido.estado === 'ENTREGADO' ? styles.estadoEntregado :
                        styles.estadoEnPreparacion
                      ]}>
                        {selectedPedido.estado.replace('_', ' ')}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>Combos</Text>
                    {selectedPedido.combos && selectedPedido.combos.length > 0 ? (
                      selectedPedido.combos.map((combo, index) => (
                        <View key={index} style={styles.comboDetailRow}>
                          <Text style={styles.comboDetailName}>{combo.cantidad}x {combo.comboNombre}</Text>
                          <Text style={styles.comboDetailPrice}>{formatCurrency(combo.precioUnit * combo.cantidad)}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.emptyText}>No hay combos en este pedido</Text>
                    )}
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>Resumen de Pago</Text>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Subtotal:</Text>
                      <Text style={styles.summaryValue}>{formatCurrency(selectedPedido.subtotal)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Costo de envío:</Text>
                      <Text style={styles.summaryValue}>{formatCurrency(selectedPedido.costoTransporte)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>IVA (13%):</Text>
                      <Text style={styles.summaryValue}>{formatCurrency(selectedPedido.subtotal * 0.13)}</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                      <Text style={[styles.summaryLabel, styles.totalLabel]}>Total:</Text>
                      <Text style={[styles.summaryValue, styles.totalValue]}>
                        {formatCurrency(selectedPedido.total)}
                      </Text>
                    </View>
                  </View>

                  {selectedPedido.estado === 'EN_CAMINO' && (
                    <View style={styles.detailSection}>
                      <Text style={styles.detailTitle}>Acciones</Text>
                      <TouchableOpacity 
                        style={[styles.actionButton, styles.entregadoButton]}
                        onPress={() => actualizarEstadoPedido(selectedPedido.id, 'ENTREGADO')}
                        disabled={loading}
                      >
                        <Text style={styles.actionButtonText}>Marcar como Entregado</Text>
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