import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  ActivityIndicator, 
  Alert, 
  TextInput, 
  RefreshControl,
  Dimensions,
  Platform,
  SafeAreaView,
  Animated,
  Easing,
  Image
} from 'react-native';
import AuthButton from '../../components/AuthButton';
import styles from './RestauranteStyle';
import eatsLogo from '../../assets/eats_logo.png';

const BASE_URL = 'http://192.168.100.4:8080';
const { width, height } = Dimensions.get('window');
const isMobile = width < 768;
const isTablet = width >= 768 && width < 1024;
const isWeb = !isMobile && !isTablet;

export default function RestauranteScreen({ restaurante, onLogout }) {
  const [pedidos, setPedidos] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('preparacion');
  const [modalComboVisible, setModalComboVisible] = useState(false);
  const [modalPedidoVisible, setModalPedidoVisible] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [currentCombo, setCurrentCombo] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(!isMobile);
  
  const [comboNum, setComboNum] = useState('');
  const [descripcionCombo, setDescripcionCombo] = useState('');
  const [precioCombo, setPrecioCombo] = useState('');
  
  const sidebarAnim = useRef(new Animated.Value(isMobile ? -width : 0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchDatos();
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const newIsMobile = window.width < 768;
      setSidebarVisible(!newIsMobile);
    });
    
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (isMobile) {
      Animated.parallel([
        Animated.timing(sidebarAnim, {
          toValue: sidebarVisible ? 0 : -width,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: sidebarVisible ? 0.5 : 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [sidebarVisible, isMobile]);

  useEffect(() => {
    if (modalPedidoVisible || modalComboVisible) {
      Animated.spring(modalScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [modalPedidoVisible, modalComboVisible]);

  const fetchDatos = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchPedidos(), fetchCombos()]);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const fetchPedidos = async () => {
    const response = await fetch(`${BASE_URL}/api/restaurantes/${restaurante.cedulaJuridica}/pedidos`);
    if (!response.ok) throw new Error('Error al obtener pedidos');
    const data = await response.json();
    setPedidos(data);
  };

  const fetchCombos = async () => {
    const response = await fetch(`${BASE_URL}/api/restaurantes/${restaurante.cedulaJuridica}/combos`);
    if (!response.ok) throw new Error('Error al obtener combos');
    const data = await response.json();
    setCombos(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDatos();
    } finally {
      setRefreshing(false);
    }
  };

  const pedidosEnPreparacion = pedidos.filter(p => p.estado === 'EN_PREPARACION');
  const pedidosEnCamino = pedidos.filter(p => p.estado === 'EN_CAMINO');
  const pedidosEntregados = pedidos.filter(p => p.estado === 'ENTREGADO');

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
          fechaPedido: nuevoEstado === 'EN_PREPARACION' ? new Date().toISOString() : pedidoActual.fechaPedido,
          fechaEntrega: nuevoEstado === 'ENTREGADO' ? new Date().toISOString() : null
        })
      });

      if (!response.ok) throw new Error('Error al actualizar pedido');
      
      Alert.alert('Éxito', 'Estado del pedido actualizado');
      await fetchPedidos();
      setModalPedidoVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCombo = async () => {
    try {
      setLoading(true);
      const comboData = {
        comboNum: parseInt(comboNum),
        descripcion: descripcionCombo,
        precio: parseFloat(precioCombo),
        restauranteId: restaurante.cedulaJuridica
      };

      const url = currentCombo 
        ? `${BASE_URL}/api/combos/${currentCombo.id}`
        : `${BASE_URL}/api/combos`;
      
      const method = currentCombo ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comboData)
      });

      if (!response.ok) throw new Error('Error al guardar combo');
      
      Alert.alert('Éxito', currentCombo ? 'Combo actualizado' : 'Combo creado');
      await fetchCombos();
      resetComboForm();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCombo = async (comboId) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/combos/${comboId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Error al eliminar combo');
      
      Alert.alert('Éxito', 'Combo eliminado');
      await fetchCombos();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetComboForm = () => {
    setCurrentCombo(null);
    setComboNum('');
    setDescripcionCombo('');
    setPrecioCombo('');
    setModalComboVisible(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CR', { 
      style: 'currency', 
      currency: 'CRC',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No asignada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CR') + ' ' + date.toLocaleTimeString('es-CR');
  };

  const renderPedidoItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.pedidoCard}
      onPress={() => {
        setSelectedPedido(item);
        setModalPedidoVisible(true);
      }}
    >
      <Text style={styles.pedidoTitle}>Pedido #{item.id}</Text>
      <Text style={styles.pedidoInfo}>Cliente: {item.clienteId}</Text>
      <Text style={styles.pedidoInfo}>Repartidor: {item.repartidorId}</Text>
      <Text style={styles.pedidoInfo}>Total: {formatCurrency(item.total)}</Text>
      <Text style={[
        styles.pedidoEstado,
        item.estado === 'EN_PREPARACION' ? styles.estadoPreparacion :
        item.estado === 'EN_CAMINO' ? styles.estadoCamino :
        styles.estadoEntregado
      ]}>
        {item.estado.replace('_', ' ')}
      </Text>
    </TouchableOpacity>
  );

  const renderComboItem = ({ item }) => (
    <View style={styles.comboCard}>
      <Text style={styles.comboTitle}>Combo #{item.comboNum}</Text>
      <Text style={styles.comboDescription}>{item.descripcion}</Text>
      <Text style={styles.comboPrice}>{formatCurrency(item.precio)}</Text>
      
      <View style={styles.comboButtons}>
        <TouchableOpacity 
          style={[styles.comboButton, styles.editButton]}
          onPress={() => {
            setCurrentCombo(item);
            setComboNum(item.comboNum.toString());
            setDescripcionCombo(item.descripcion);
            setPrecioCombo(item.precio.toString());
            setModalComboVisible(true);
          }}
        >
          <Text style={styles.comboButtonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.comboButton, styles.deleteButton]}
          onPress={() => handleDeleteCombo(item.id)}
        >
          <Text style={styles.comboButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabContent = () => {
    let data = [];
    let emptyText = '';
    
    switch (activeTab) {
      case 'preparacion':
        data = pedidosEnPreparacion;
        emptyText = 'No hay pedidos en preparación';
        break;
      case 'camino':
        data = pedidosEnCamino;
        emptyText = 'No hay pedidos en camino';
        break;
      case 'entregados':
        data = pedidosEntregados;
        emptyText = 'No hay pedidos entregados';
        break;
      case 'combos':
        return (
          <View style={styles.combosContainer}>
            <TouchableOpacity 
              style={styles.addComboButton}
              onPress={() => setModalComboVisible(true)}
            >
              <Text style={styles.addComboButtonText}>+ Nuevo Combo</Text>
            </TouchableOpacity>
            
            <FlatList
              data={combos}
              renderItem={renderComboItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No hay combos registrados</Text>
              }
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        );
      default:
        return null;
    }

    return (
      <FlatList
        data={data}
        renderItem={renderPedidoItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{emptyText}</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Overlay para cerrar el sidebar en móvil */}
        {isMobile && sidebarVisible && (
          <Animated.View 
            style={[
              styles.overlay,
              {
                opacity: overlayOpacity,
              }
            ]}
          >
            <TouchableOpacity
              style={styles.overlayTouchable}
              onPress={toggleSidebar}
            />
          </Animated.View>
        )}

        {/* Sidebar animado */}
        <Animated.View 
          style={[
            styles.sidebar, 
            isMobile && styles.mobileSidebar,
            isWeb && styles.webSidebar,
            isMobile && {
              transform: [{ translateX: sidebarAnim }]
            }
          ]}
        >
          <View style={styles.profileSection}>
            <Image 
              source={eatsLogo} 
              style={styles.sidebarLogo}
            />
            <Text style={styles.userName}>{restaurante.nombre}</Text>
            <Text style={styles.userInfo}>Cédula: {restaurante.cedulaJuridica}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.sidebarButton, activeTab === 'preparacion' && styles.activeTab]}
            onPress={() => {
              setActiveTab('preparacion');
              if (isMobile) setSidebarVisible(false);
            }}
          >
            <Text style={styles.sidebarButtonText}>
              En Preparación ({pedidosEnPreparacion.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sidebarButton, activeTab === 'camino' && styles.activeTab]}
            onPress={() => {
              setActiveTab('camino');
              if (isMobile) setSidebarVisible(false);
            }}
          >
            <Text style={styles.sidebarButtonText}>
              En Camino ({pedidosEnCamino.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sidebarButton, activeTab === 'entregados' && styles.activeTab]}
            onPress={() => {
              setActiveTab('entregados');
              if (isMobile) setSidebarVisible(false);
            }}
          >
            <Text style={styles.sidebarButtonText}>
              Entregados ({pedidosEntregados.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.sidebarButton, activeTab === 'combos' && styles.activeTab]}
            onPress={() => {
              setActiveTab('combos');
              if (isMobile) setSidebarVisible(false);
            }}
          >
            <Text style={styles.sidebarButtonText}>
              Combos ({combos.length})
            </Text>
          </TouchableOpacity>
          
          <AuthButton 
            title="Cerrar sesión" 
            onPress={onLogout}
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </Animated.View>

        {/* Contenido principal */}
        <View style={[
          styles.content, 
          isMobile && styles.mobileContent,
          isWeb && styles.webContent
        ]}>
          {loading && !modalPedidoVisible && !modalComboVisible ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {renderTabContent()}
              {/* Logo centrado debajo del contenido solo en mobile */}
              {isMobile && (
                <View style={styles.logoContainer}>
                  <Image 
                    source={eatsLogo} 
                    style={styles.mobileLogo}
                  />
                </View>
              )}
            </>
          )}
        </View>

        {/* Botón flotante para abrir sidebar en móvil - POSICIÓN CORREGIDA (esquina inferior derecha) */}
        {isMobile && !sidebarVisible && (
          <TouchableOpacity 
            style={styles.sidebarToggleButton}
            onPress={toggleSidebar}
          >
            <Text style={styles.sidebarToggleButtonText}>☰</Text>
          </TouchableOpacity>
        )}
        
        {/* Modal de detalle de pedido */}
        <Modal
          animationType="none"
          transparent={false}
          visible={modalPedidoVisible}
          onRequestClose={() => setModalPedidoVisible(false)}
        >
          <SafeAreaView style={styles.modalSafeArea}>
            <Animated.View style={[
              styles.modalContainer,
              {
                opacity: modalScale,
                transform: [
                  { scale: modalScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1]
                  })}
                ]
              }
            ]}>
              <View style={styles.modalHeader}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => setModalPedidoVisible(false)}
                >
                  <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Pedido #{selectedPedido?.id}</Text>
              </View>
              
              {selectedPedido && (
                <ScrollView style={styles.modalContent}>
                  <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>Información del Pedido</Text>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Cliente:</Text>
                      <Text style={styles.detailValue}>{selectedPedido.clienteId}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Repartidor:</Text>
                      <Text style={styles.detailValue}>{selectedPedido.repartidorId}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Fecha Pedido:</Text>
                      <Text style={styles.detailValue}>{formatDate(selectedPedido.fechaPedido)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Fecha Entrega:</Text>
                      <Text style={styles.detailValue}>{formatDate(selectedPedido.fechaEntrega)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Estado:</Text>
                      <Text style={[
                        styles.detailValue,
                        selectedPedido.estado === 'EN_PREPARACION' ? styles.estadoPreparacion :
                        selectedPedido.estado === 'EN_CAMINO' ? styles.estadoCamino :
                        styles.estadoEntregado
                      ]}>
                        {selectedPedido.estado.replace('_', ' ')}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>Detalles de Pago</Text>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Subtotal:</Text>
                      <Text style={styles.detailValue}>{formatCurrency(selectedPedido.subtotal)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Costo Transporte:</Text>
                      <Text style={styles.detailValue}>{formatCurrency(selectedPedido.costoTransporte)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>IVA:</Text>
                      <Text style={styles.detailValue}>{formatCurrency(selectedPedido.iva)}</Text>
                    </View>
                    <View style={[styles.detailRow, { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 }]}>
                      <Text style={[styles.detailLabel, { fontWeight: 'bold' }]}>Total:</Text>
                      <Text style={[styles.detailValue, { fontWeight: 'bold', color: '#2ecc71' }]}>
                        {formatCurrency(selectedPedido.total)}
                      </Text>
                    </View>
                  </View>

                  {selectedPedido.estado === 'EN_PREPARACION' && (
                    <View style={styles.detailSection}>
                      <Text style={styles.detailTitle}>Acciones</Text>
                      <TouchableOpacity 
                        style={[styles.actionButton, styles.caminoButton]}
                        onPress={() => actualizarEstadoPedido(selectedPedido.id, 'EN_CAMINO')}
                        disabled={loading}
                      >
                        <Text style={styles.actionButtonText}>Marcar como En Camino</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </ScrollView>
              )}
            </Animated.View>
          </SafeAreaView>
        </Modal>

        {/* Modal de gestión de combos */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalComboVisible}
          onRequestClose={() => setModalComboVisible(false)}
        >
          <SafeAreaView style={styles.modalSafeArea}>
            <Animated.View style={[
              styles.modalContainer,
              {
                opacity: modalScale,
                transform: [
                  { scale: modalScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1]
                  })}
                ]
              }
            ]}>
              <View style={styles.modalHeader}>
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => setModalComboVisible(false)}
                >
                  <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>
                  {currentCombo ? 'Editar Combo' : 'Nuevo Combo'}
                </Text>
              </View>
              
              <ScrollView style={styles.modalContent}>
                <View style={styles.detailSection}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Número de Combo</Text>
                    <TextInput
                      style={styles.input}
                      value={comboNum}
                      onChangeText={setComboNum}
                      placeholder="Ej: 1"
                      keyboardType="numeric"
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Descripción</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      value={descripcionCombo}
                      onChangeText={setDescripcionCombo}
                      placeholder="Descripción del combo"
                      multiline
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Precio (CRC)</Text>
                    <TextInput
                      style={styles.input}
                      value={precioCombo}
                      onChangeText={setPrecioCombo}
                      placeholder="Precio"
                      keyboardType="numeric"
                    />
                  </View>
                  
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.saveButton]}
                      onPress={handleSaveCombo}
                      disabled={!comboNum || !descripcionCombo || !precioCombo}
                    >
                      <Text style={styles.actionButtonText}>
                        {currentCombo ? 'Actualizar' : 'Guardar'}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.cancelButton]}
                      onPress={() => setModalComboVisible(false)}
                    >
                      <Text style={styles.actionButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </Animated.View>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}