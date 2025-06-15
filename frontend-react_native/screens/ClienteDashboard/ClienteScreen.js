import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  Platform, 
  ActivityIndicator, 
  Alert, 
  TextInput, 
  Dimensions,
  Animated,
  Easing,
  Image 
} from 'react-native';
import AuthButton from '../../components/AuthButton';
import styles from './ClienteStyle';
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

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');
const isMobile = width < 768;

export default function ClienteScreen({ cliente = {}, onLogout }) {
  // Estado inicial seguro con valores por defecto
  const safeCliente = {
    nombre: 'Usuario',
    direccion: '',
    cedula: '',
    ...cliente
  };

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
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [calificacion, setCalificacion] = useState(3); // Valor por defecto 3
  // Animaciones para el sidebar móvil
  const sidebarAnimation = useRef(new Animated.Value(-300)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;

  // Función para obtener el primer nombre
  const getFirstName = () => {
    return safeCliente.nombre?.split(' ')[0] || 'Usuario';
  };

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.parallel([
        Animated.timing(sidebarAnimation, {
          toValue: -300,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true
        }),
        Animated.timing(overlayAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.parallel([
        Animated.timing(sidebarAnimation, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true
        }),
        Animated.timing(overlayAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }
  };

  useEffect(() => {
    fetchRestaurantes();
    if (safeCliente.cedula) {
      fetchPedidosCliente();
    }
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
    if (safeCliente.cedula) {
      fetchQuejasCliente();
    }
  }, [safeCliente.cedula]);

  const fetchQuejasCliente = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/clientes/${safeCliente.cedula}/quejas`);
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

  const enviarCalificacion = async () => {
    if (!descripcionQueja) {
      Alert.alert('Error', 'Por favor ingresa un comentario sobre tu experiencia');
      return;
    }

    // Validar que la calificación esté entre 1 y 5
    if (calificacion < 1 || calificacion > 5) {
      Alert.alert('Error', 'La calificación debe ser entre 1 (Malo) y 5 (Excelente)');
      return;
    }

    try {
      setLoading(true);
      
      const quejaData = {
        repartidorId: repartidorId,
        clienteId: safeCliente.cedula,
        pedidoId: selectedPedido?.id,
        descripcion: `Calificación: ${calificacion}/5 - ${descripcionQueja}`
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
        throw new Error(errorData.mensaje || 'Error al enviar calificación');
      }

      Alert.alert('Gracias', 'Tu calificación ha sido registrada correctamente');
      setQuejasModalVisible(false);
      fetchQuejasCliente();
    } catch (error) {
      console.error('Error enviando calificación:', error);
      Alert.alert('Error', error.message || 'No se pudo enviar la calificación');
    } finally {
      setLoading(false);
    }
  };

  // Componente de estrellas para calificación
  const RatingStars = ({ rating, onRatingChange }) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star} 
            onPress={() => onRatingChange(star)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.star, 
              star <= rating ? styles.starFilled : styles.starEmpty
            ]}>
              {star <= rating ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.ratingText}>
          {rating === 1 && 'Malo'}
          {rating === 2 && 'Regular'}
          {rating === 3 && 'Bueno'}
          {rating === 4 && 'Muy Bueno'}
          {rating === 5 && 'Excelente'}
        </Text>
      </View>
    );
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
        clienteId: safeCliente.cedula,
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
      const response = await fetch(`${BASE_URL}/api/clientes/${safeCliente.cedula}/pedidos`);
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
        clienteId: safeCliente.cedula,
        restauranteId: selectedRestaurante.cedulaJuridica,
        estado: "EN_PREPARACION",
        subtotal: subtotal,
        costoTransporte: costoTransporte,
        direccion: safeCliente.direccion
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
        styles.restauranteCard,
        isMobile ? styles.mobileRestauranteCard : styles.desktopRestauranteCard
      ]}
      onPress={() => handleRestauranteSelect(item)}
    >
      <Text style={styles.restauranteNombre}>{item.nombre}</Text>
      <Text style={styles.restauranteInfo}>{item.direccion}</Text>
      <Text style={styles.restauranteInfo}>Tipo: {item.tipoComida}</Text>
    </TouchableOpacity>
  );

  const renderComboItem = ({ item }) => (
    <View style={[
      styles.comboCard,
      isMobile ? styles.comboCardMobile : styles.comboCardDesktop
    ]}>
      <Text style={styles.comboNombre}>{item.nombre}</Text>
      <Text style={styles.comboDescripcion}>{item.descripcion}</Text>
      <Text style={styles.comboPrecio}>{formatCurrency(item.precio)}</Text>
      
      <View style={styles.comboActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => removeCombo(item.id)}
          disabled={!selectedCombos.some(c => c.id === item.id)}
        >
          <Text style={styles.actionButtonText}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.comboCantidad}>
          {selectedCombos.find(c => c.id === item.id)?.cantidad || 0}
        </Text>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleComboSelect(item)}
        >
          <Text style={styles.actionButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPedidoItem = ({ item }) => (
  <View style={[
    styles.pedidoCard,
    isMobile ? styles.pedidoCardMobile : styles.pedidoCardDesktop
  ]}>
    <Text style={styles.pedidoTitle}>Pedido #{item.id}</Text>
    <Text style={styles.pedidoInfo}>Estado: {item.estado}</Text>
    <Text style={styles.pedidoInfo}>Fecha: {new Date(item.fechaPedido).toLocaleString()}</Text>
    <Text style={styles.pedidoInfo}>Total: {formatCurrency(item.total)}</Text>
    
    {item.estado === 'ENTREGADO' && (
      <TouchableOpacity 
        style={styles.quejaButton}
        onPress={() => {
          setSelectedPedido(item);
          setCalificacion(3); // Resetear a valor medio
          setDescripcionQueja('');
          setRepartidorId(item.repartidorId || '');
          setQuejasModalVisible(true);
        }}
      >
        <Text style={styles.quejaButtonText}>Calificar Pedido</Text>
      </TouchableOpacity>
    )}
  </View>
);

  return (
    <View style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      {/* Sidebar en desktop */}
      {!isMobile && (
        <View style={styles.sidebar}>
          <View>
            <Image 
              source={eatsLogo} 
              style={styles.sidebarLogo}
            />
            <View style={styles.profileSection}>
              <Text style={styles.welcomeText}>Bienvenido</Text>
              <Text style={styles.userName}>{safeCliente.nombre}</Text>
              <Text style={styles.userInfo}>{safeCliente.direccion}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.sidebarButton}
              onPress={() => setPedidosModalVisible(true)}
            >
              <Text style={styles.sidebarButtonText}>Mis Pedidos ({pedidos.length})</Text>
            </TouchableOpacity>
          </View>
          
          <AuthButton 
            title="Cerrar sesión" 
            onPress={onLogout}
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </View>
      )}

      {/* Sidebar en móvil con animación */}
      {isMobile && sidebarVisible && (
        <>
          <Animated.View 
            style={[
              styles.mobileOverlay,
              {
                opacity: overlayAnimation,
                transform: [{ translateX: sidebarAnimation.interpolate({
                  inputRange: [-300, 0],
                  outputRange: [-300, 0]
                }) }]
              }
            ]}
            onTouchEnd={toggleSidebar}
          />
          <Animated.View 
            style={[
              styles.mobileSidebar,
              {
                transform: [{ translateX: sidebarAnimation }]
              }
            ]}
          >
            <View style={{ flex: 1 }}>
              <View>
                <Image 
                  source={eatsLogo} 
                  style={styles.sidebarLogo}
                />
                <View style={styles.profileSection}>
                  <Text style={styles.welcomeText}>Bienvenido</Text>
                  <Text style={styles.userName}>{safeCliente.nombre}</Text>
                  <Text style={styles.userInfo}>{safeCliente.direccion}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.sidebarButton}
                  onPress={() => {
                    setPedidosModalVisible(true);
                    toggleSidebar();
                  }}
                >
                  <Text style={styles.sidebarButtonText}>Mis Pedidos ({pedidos.length})</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={{ marginBottom: 20 }}>
              <AuthButton 
                title="Cerrar sesión" 
                onPress={onLogout}
                style={styles.logoutButton}
                textStyle={styles.logoutButtonText}
              />
            </View>
          </Animated.View>
        </>
      )}

      {/* Contenido principal */}
      <View style={isMobile ? styles.mobileContent : styles.desktopContent}>
        {/* Header en móvil */}
        {isMobile && (
          <View style={styles.mobileHeader}>
          </View>
        )}

        {/* Lista de restaurantes */}
        {loading && !modalVisible && !pedidosModalVisible ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          restaurantes.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.emptyText}>No hay restaurantes disponibles</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={restaurantes}
                renderItem={renderRestauranteItem}
                keyExtractor={item => item.cedulaJuridica}
                contentContainerStyle={isMobile ? styles.mobileListContainer : styles.desktopListContainer}
                numColumns={isMobile ? 1 : 3}
                columnWrapperStyle={!isMobile ? styles.desktopColumnWrapper : null}
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
          )
        )}
      </View>
      
      {/* Botón flotante para abrir sidebar en móvil */}
      {isMobile && !sidebarVisible && (
        <TouchableOpacity 
          style={styles.floatingSidebarButton}
          onPress={toggleSidebar}
        >
          <Text style={styles.floatingSidebarButtonText}>☰</Text>
        </TouchableOpacity>
      )}
      
      {/* Modal para seleccionar combos */}
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
              onPress={() => {
                setModalVisible(false);
                setSelectedCombos([]);
              }}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedRestaurante?.nombre}</Text>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <FlatList
                data={combos}
                renderItem={renderComboItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>Este restaurante no tiene combos disponibles</Text>
                }
                numColumns={isMobile ? 1 : 2}
              />
              
              <View style={[
                styles.summaryContainer,
                isMobile ? styles.summaryContainerMobile : styles.summaryContainerDesktop
              ]}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal:</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Costo de envío:</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(costoTransporte)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>IVA (13%):</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(subtotal * 0.13)}</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text style={[styles.summaryLabel, styles.totalLabel]}>Total:</Text>
                  <Text style={[styles.summaryValue, styles.totalValue]}>
                    {formatCurrency(subtotal + costoTransporte + (subtotal * 0.13))}
                  </Text>
                </View>
              </View>
              
              <View style={[
                styles.modalButtons,
                isMobile ? styles.modalButtonsMobile : styles.modalButtonsDesktop
              ]}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedCombos([]);
                  }}
                  disabled={loading}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={realizarPedido}
                  disabled={loading || selectedCombos.length === 0}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.modalButtonText}>Realizar Pedido</Text>
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
          styles.modalContainer,
          isMobile ? styles.modalContainerMobile : styles.modalContainerDesktop
        ]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setPedidosModalVisible(false)}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Mis Pedidos</Text>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {pedidos.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image 
                    source={eatsLogo} 
                    style={styles.logo}
                  />
                  <Text style={styles.noPedidosText}>No has realizado ningún pedido aún</Text>
                </View>
              ) : (
                <FlatList
                  data={pedidos}
                  renderItem={renderPedidoItem}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={styles.listContainer}
                  numColumns={isMobile ? 1 : 2}
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
      styles.modalContainer,
      isMobile ? styles.modalContainerMobile : styles.modalContainerDesktop
    ]}>
      <View style={styles.modalHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setQuejasModalVisible(false)}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Calificar Pedido #{selectedPedido?.id}</Text>
      </View>

      <View style={[
        styles.quejaFormContainer,
        isMobile ? styles.quejaFormContainerMobile : styles.quejaFormContainerDesktop
      ]}>
        <Text style={styles.calificacionTitle}>¿Cómo calificarías este pedido?</Text>
        
        <RatingStars 
          rating={calificacion} 
          onRatingChange={setCalificacion} 
        />

        {selectedPedido?.repartidorId && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Repartidor:</Text>
            <TextInput
              style={styles.input}
              value={repartidorId}
              onChangeText={setRepartidorId}
              editable={false}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Comentarios:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={descripcionQueja}
            onChangeText={setDescripcionQueja}
            placeholder="Describe tu experiencia con el pedido (opcional)..."
          />
        </View>

        <TouchableOpacity 
          style={[styles.modalButton, styles.confirmButton]}
          onPress={enviarCalificacion}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.modalButtonText}>Enviar Calificación</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
    </View>
  );
}