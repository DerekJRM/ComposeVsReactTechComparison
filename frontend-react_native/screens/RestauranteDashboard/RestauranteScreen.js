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

export default function RestauranteScreen({ restaurante, onLogout }) {
  // Estados para pedidos
  const [pedidosNuevos, setPedidosNuevos] = useState([]);
  const [pedidosEnPreparacion, setPedidosEnPreparacion] = useState([]);
  const [pedidosListos, setPedidosListos] = useState([]);
  const [pedidosHistorial, setPedidosHistorial] = useState([]);
  
  // Estados para gestión de combos
  const [combos, setCombos] = useState([]);
  const [modalComboVisible, setModalComboVisible] = useState(false);
  const [currentCombo, setCurrentCombo] = useState(null);
  const [isEditingCombo, setIsEditingCombo] = useState(false);
  
  // Estados generales
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('nuevos'); // 'nuevos', 'preparacion', 'listos', 'historial', 'combos'

  // Formulario combo
  const [nombreCombo, setNombreCombo] = useState('');
  const [descripcionCombo, setDescripcionCombo] = useState('');
  const [precioCombo, setPrecioCombo] = useState('');
  const [imagenCombo, setImagenCombo] = useState('');

  useEffect(() => {
    fetchPedidos();
    fetchCombos();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchPedidos(),
        fetchCombos()
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      // Obtener todos los pedidos del restaurante
      const response = await fetch(`${BASE_URL}/api/restaurantes/${restaurante.id}/pedidos`);
      if (!response.ok) throw new Error('Error al obtener pedidos del restaurante');
      const data = await response.json();
      
      // Filtrar por estados
      setPedidosNuevos(data.filter(p => p.estado === 'NUEVO'));
      setPedidosEnPreparacion(data.filter(p => p.estado === 'EN_PREPARACION'));
      setPedidosListos(data.filter(p => p.estado === 'LISTO'));
      setPedidosHistorial(data.filter(p => p.estado === 'ENTREGADO' || p.estado === 'CANCELADO'));
    } catch (error) {
      console.error('Error fetching pedidos:', error);
      Alert.alert('Error', 'No se pudieron cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  const fetchCombos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/restaurantes/${restaurante.id}/combos`);
      if (!response.ok) throw new Error('Error al obtener combos');
      const data = await response.json();
      setCombos(data);
    } catch (error) {
      console.error('Error fetching combos:', error);
      Alert.alert('Error', 'No se pudieron cargar los combos');
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
          fechaPreparacion: nuevoEstado === 'EN_PREPARACION' ? new Date().toISOString() : pedidoActual.fechaPreparacion,
          fechaListo: nuevoEstado === 'LISTO' ? new Date().toISOString() : pedidoActual.fechaListo
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al actualizar estado del pedido');
      }

      Alert.alert('Éxito', 'Estado del pedido actualizado correctamente');
      
      // Actualizamos las listas
      await fetchPedidos();
      setModalVisible(false);
    } catch (error) {
      console.error('Error actualizando estado del pedido:', error);
      Alert.alert('Error', error.message || 'No se pudo actualizar el estado del pedido');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCombo = async () => {
    try {
      setLoading(true);
      
      const comboData = {
        nombre: nombreCombo,
        descripcion: descripcionCombo,
        precio: parseFloat(precioCombo),
        imagen: imagenCombo,
        restauranteId: restaurante.id
      };

      let response;
      if (isEditingCombo) {
        // Actualizar combo existente
        response = await fetch(`${BASE_URL}/api/combos/${currentCombo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comboData)
        });
      } else {
        // Crear nuevo combo
        response = await fetch(`${BASE_URL}/api/combos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comboData)
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al guardar el combo');
      }

      Alert.alert('Éxito', isEditingCombo ? 'Combo actualizado correctamente' : 'Combo creado correctamente');
      await fetchCombos();
      resetComboForm();
      setModalComboVisible(false);
    } catch (error) {
      console.error('Error guardando combo:', error);
      Alert.alert('Error', error.message || 'No se pudo guardar el combo');
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al eliminar el combo');
      }

      Alert.alert('Éxito', 'Combo eliminado correctamente');
      await fetchCombos();
    } catch (error) {
      console.error('Error eliminando combo:', error);
      Alert.alert('Error', error.message || 'No se pudo eliminar el combo');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCombo = (combo) => {
    setCurrentCombo(combo);
    setNombreCombo(combo.nombre);
    setDescripcionCombo(combo.descripcion);
    setPrecioCombo(combo.precio.toString());
    setImagenCombo(combo.imagen || '');
    setIsEditingCombo(true);
    setModalComboVisible(true);
  };

  const resetComboForm = () => {
    setCurrentCombo(null);
    setNombreCombo('');
    setDescripcionCombo('');
    setPrecioCombo('');
    setImagenCombo('');
    setIsEditingCombo(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CR', { 
      style: 'currency', 
      currency: 'CRC',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderPedidoItem = ({ item }) => (
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
      <Text style={localStyles.pedidoInfo}>Cliente: {item.clienteNombre}</Text>
      <Text style={localStyles.pedidoInfo}>Dirección: {item.direccion}</Text>
      <Text style={localStyles.pedidoInfo}>Total: {formatCurrency(item.total)}</Text>
      <Text style={[
        localStyles.pedidoEstado,
        item.estado === 'NUEVO' ? localStyles.estadoNuevo :
        item.estado === 'EN_PREPARACION' ? localStyles.estadoEnPreparacion :
        item.estado === 'LISTO' ? localStyles.estadoListo :
        item.estado === 'ENTREGADO' ? localStyles.estadoEntregado :
        localStyles.estadoCancelado
      ]}>
        {item.estado.replace('_', ' ')}
      </Text>
    </TouchableOpacity>
  );

  const renderComboItem = ({ item }) => (
    <View style={[
      localStyles.comboCard,
      isMobile ? localStyles.comboCardMobile : localStyles.comboCardDesktop
    ]}>
      <Text style={localStyles.comboTitle}>{item.nombre}</Text>
      <Text style={localStyles.comboDescription}>{item.descripcion}</Text>
      <Text style={localStyles.comboPrice}>{formatCurrency(item.precio)}</Text>
      
      <View style={localStyles.comboButtons}>
        <TouchableOpacity 
          style={[localStyles.comboButton, localStyles.editButton]}
          onPress={() => handleEditCombo(item)}
        >
          <Text style={localStyles.comboButtonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[localStyles.comboButton, localStyles.deleteButton]}
          onPress={() => handleDeleteCombo(item.id)}
          disabled={loading}
        >
          <Text style={localStyles.comboButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'nuevos':
        return (
          <FlatList
            data={pedidosNuevos}
            renderItem={renderPedidoItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={isMobile ? localStyles.mobileListContainer : localStyles.desktopListContainer}
            ListEmptyComponent={
              <Text style={localStyles.emptyText}>No hay pedidos nuevos</Text>
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
      case 'preparacion':
        return (
          <FlatList
            data={pedidosEnPreparacion}
            renderItem={renderPedidoItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={isMobile ? localStyles.mobileListContainer : localStyles.desktopListContainer}
            ListEmptyComponent={
              <Text style={localStyles.emptyText}>No hay pedidos en preparación</Text>
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
      case 'listos':
        return (
          <FlatList
            data={pedidosListos}
            renderItem={renderPedidoItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={isMobile ? localStyles.mobileListContainer : localStyles.desktopListContainer}
            ListEmptyComponent={
              <Text style={localStyles.emptyText}>No hay pedidos listos para entrega</Text>
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
            renderItem={renderPedidoItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={isMobile ? localStyles.mobileListContainer : localStyles.desktopListContainer}
            ListEmptyComponent={
              <Text style={localStyles.emptyText}>No hay pedidos en el historial</Text>
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
      case 'combos':
        return (
          <View style={localStyles.combosContainer}>
            <TouchableOpacity 
              style={localStyles.addComboButton}
              onPress={() => {
                resetComboForm();
                setModalComboVisible(true);
              }}
            >
              <Text style={localStyles.addComboButtonText}>+ Agregar Nuevo Combo</Text>
            </TouchableOpacity>
            
            <FlatList
              data={combos}
              renderItem={renderComboItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={isMobile ? localStyles.mobileListContainer : localStyles.desktopListContainer}
              ListEmptyComponent={
                <Text style={localStyles.emptyText}>No hay combos registrados</Text>
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
          </View>
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
            <Text style={localStyles.userName}>{restaurante.nombre}</Text>
            <Text style={localStyles.userInfo}>ID: {restaurante.id}</Text>
            <Text style={localStyles.userInfo}>Dirección: {restaurante.direccion}</Text>
          </View>
          
          <TouchableOpacity 
            style={[localStyles.sidebarButton, activeTab === 'nuevos' && localStyles.activeTab]}
            onPress={() => setActiveTab('nuevos')}
          >
            <Text style={localStyles.sidebarButtonText}>Pedidos Nuevos ({pedidosNuevos.length})</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[localStyles.sidebarButton, activeTab === 'preparacion' && localStyles.activeTab]}
            onPress={() => setActiveTab('preparacion')}
          >
            <Text style={localStyles.sidebarButtonText}>En Preparación ({pedidosEnPreparacion.length})</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[localStyles.sidebarButton, activeTab === 'listos' && localStyles.activeTab]}
            onPress={() => setActiveTab('listos')}
          >
            <Text style={localStyles.sidebarButtonText}>Listos para Entrega ({pedidosListos.length})</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[localStyles.sidebarButton, activeTab === 'historial' && localStyles.activeTab]}
            onPress={() => setActiveTab('historial')}
          >
            <Text style={localStyles.sidebarButtonText}>Historial ({pedidosHistorial.length})</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[localStyles.sidebarButton, activeTab === 'combos' && localStyles.activeTab]}
            onPress={() => setActiveTab('combos')}
          >
            <Text style={localStyles.sidebarButtonText}>Gestión de Combos</Text>
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
            <Text style={localStyles.mobileWelcome}>{restaurante.nombre}</Text>
            <Text style={localStyles.mobileInfo}>ID: {restaurante.id}</Text>
            <Text style={localStyles.mobileInfo}>Dirección: {restaurante.direccion}</Text>
            
            <View style={localStyles.tabContainer}>
              <TouchableOpacity 
                style={[localStyles.tabButton, activeTab === 'nuevos' && localStyles.activeTab]}
                onPress={() => setActiveTab('nuevos')}
              >
                <Text style={localStyles.tabButtonText}>Nuevos ({pedidosNuevos.length})</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[localStyles.tabButton, activeTab === 'preparacion' && localStyles.activeTab]}
                onPress={() => setActiveTab('preparacion')}
              >
                <Text style={localStyles.tabButtonText}>Preparación ({pedidosEnPreparacion.length})</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[localStyles.tabButton, activeTab === 'listos' && localStyles.activeTab]}
                onPress={() => setActiveTab('listos')}
              >
                <Text style={localStyles.tabButtonText}>Listos ({pedidosListos.length})</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[localStyles.tabButton, activeTab === 'historial' && localStyles.activeTab]}
                onPress={() => setActiveTab('historial')}
              >
                <Text style={localStyles.tabButtonText}>Historial ({pedidosHistorial.length})</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[localStyles.tabButton, activeTab === 'combos' && localStyles.activeTab]}
                onPress={() => setActiveTab('combos')}
              >
                <Text style={localStyles.tabButtonText}>Combos</Text>
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
        {loading && !modalVisible && !modalComboVisible ? (
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
                        selectedPedido.estado === 'NUEVO' ? localStyles.estadoNuevo :
                        selectedPedido.estado === 'EN_PREPARACION' ? localStyles.estadoEnPreparacion :
                        selectedPedido.estado === 'LISTO' ? localStyles.estadoListo :
                        selectedPedido.estado === 'ENTREGADO' ? localStyles.estadoEntregado :
                        localStyles.estadoCancelado
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

                  {(selectedPedido.estado === 'NUEVO' || selectedPedido.estado === 'EN_PREPARACION') && (
                    <View style={localStyles.detailSection}>
                      <Text style={localStyles.detailTitle}>Acciones</Text>
                      {selectedPedido.estado === 'NUEVO' && (
                        <TouchableOpacity 
                          style={[localStyles.actionButton, localStyles.preparacionButton]}
                          onPress={() => actualizarEstadoPedido(selectedPedido.id, 'EN_PREPARACION')}
                          disabled={loading}
                        >
                          <Text style={localStyles.actionButtonText}>Comenzar Preparación</Text>
                        </TouchableOpacity>
                      )}
                      {selectedPedido.estado === 'EN_PREPARACION' && (
                        <TouchableOpacity 
                          style={[localStyles.actionButton, localStyles.listoButton]}
                          onPress={() => actualizarEstadoPedido(selectedPedido.id, 'LISTO')}
                          disabled={loading}
                        >
                          <Text style={localStyles.actionButtonText}>Marcar como Listo</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </ScrollView>
              )}
            </>
          )}
        </View>
      </Modal>

      {/* Modal para gestión de combos */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalComboVisible}
        onRequestClose={() => setModalComboVisible(false)}
      >
        <View style={[
          localStyles.modalContainer,
          isMobile ? localStyles.modalContainerMobile : localStyles.modalContainerDesktop
        ]}>
          <View style={localStyles.modalHeader}>
            <TouchableOpacity 
              style={localStyles.backButton}
              onPress={() => setModalComboVisible(false)}
            >
              <Text style={localStyles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={localStyles.modalTitle}>
              {isEditingCombo ? 'Editar Combo' : 'Nuevo Combo'}
            </Text>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ScrollView style={localStyles.modalContent}>
              <View style={localStyles.detailSection}>
                <View style={localStyles.inputContainer}>
                  <Text style={localStyles.inputLabel}>Nombre del Combo</Text>
                  <TextInput
                    style={localStyles.input}
                    value={nombreCombo}
                    onChangeText={setNombreCombo}
                    placeholder="Ej: Combo Familiar"
                  />
                </View>
                
                <View style={localStyles.inputContainer}>
                  <Text style={localStyles.inputLabel}>Descripción</Text>
                  <TextInput
                    style={[localStyles.input, localStyles.textArea]}
                    value={descripcionCombo}
                    onChangeText={setDescripcionCombo}
                    placeholder="Descripción detallada del combo"
                    multiline
                  />
                </View>
                
                <View style={localStyles.inputContainer}>
                  <Text style={localStyles.inputLabel}>Precio (CRC)</Text>
                  <TextInput
                    style={localStyles.input}
                    value={precioCombo}
                    onChangeText={setPrecioCombo}
                    placeholder="Ej: 12500"
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={localStyles.inputContainer}>
                  <Text style={localStyles.inputLabel}>URL de la Imagen (Opcional)</Text>
                  <TextInput
                    style={localStyles.input}
                    value={imagenCombo}
                    onChangeText={setImagenCombo}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </View>
                
                <View style={localStyles.buttonsContainer}>
                  <TouchableOpacity 
                    style={[localStyles.actionButton, localStyles.saveButton]}
                    onPress={handleSaveCombo}
                    disabled={loading || !nombreCombo || !descripcionCombo || !precioCombo}
                  >
                    <Text style={localStyles.actionButtonText}>
                      {isEditingCombo ? 'Actualizar Combo' : 'Guardar Combo'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[localStyles.actionButton, localStyles.cancelButton]}
                    onPress={() => {
                      resetComboForm();
                      setModalComboVisible(false);
                    }}
                    disabled={loading}
                  >
                    <Text style={localStyles.actionButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
  estadoNuevo: {
    color: '#3498db', // Azul
  },
  estadoEnPreparacion: {
    color: '#f39c12', // Amarillo/naranja
  },
  estadoListo: {
    color: '#2ecc71', // Verde
  },
  estadoEntregado: {
    color: '#27ae60', // Verde oscuro
  },
  estadoCancelado: {
    color: '#e74c3c', // Rojo
  },

  // Tarjetas de combos
  combosContainer: {
    flex: 1,
  },
  comboCard: {
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
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }
    }),
  },
  comboCardMobile: {
    width: '100%',
  },
  comboCardDesktop: {
    width: '48%',
  },
  comboTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  comboDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  comboPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 10,
  },
  comboButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comboButton: {
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  comboButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addComboButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  addComboButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
  preparacionButton: {
    backgroundColor: '#3498db',
  },
  listoButton: {
    backgroundColor: '#2ecc71',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Tabs
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
});