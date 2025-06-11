import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, FlatList, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import AuthButton from '../../components/AuthButton';
import { styles } from '../../styles/globalStyles';
import { usuarios } from '../../data/data';

export default function RestauranteScreen({ restaurante, onLogout }) {
  // Estados
  const [pedidos, setPedidos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoCombo, setNuevoCombo] = useState({ numero: '', descripcion: '', precio: '' });
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [repartidores, setRepartidores] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    totalPedidos: 0,
    pedidosHoy: 0,
    ingresosTotales: 0
  });

  // Cargar datos iniciales
  useEffect(() => {
    // Filtrar clientes y repartidores
    const clientesData = usuarios.filter(u => u.rol === 'cliente');
    const repartidoresData = usuarios.filter(u => u.rol === 'repartidor');
    
    setClientes(clientesData);
    setRepartidores(repartidoresData);
    
    // Simular pedidos del restaurante (en una app real esto vendría de una API)
    const pedidosRestaurante = [
      {
        id: 'PED-001',
        cliente: '10101010',
        combos: [{numero: 1, cantidad: 2}],
        estado: 'entregado',
        fecha: '2023-05-15T10:30:00',
        total: 8000,
        repartidor: '30303030',
        calificacion: 4
      },
      {
        id: 'PED-002',
        cliente: '10101010',
        combos: [{numero: 2, cantidad: 1}],
        estado: 'en preparación',
        fecha: '2023-05-16T12:45:00',
        total: 5000,
        repartidor: '30303030'
      }
    ];
    
    setPedidos(pedidosRestaurante);
    
    // Calcular estadísticas
    const totalPedidos = pedidosRestaurante.length;
    const pedidosHoy = pedidosRestaurante.filter(p => 
      new Date(p.fecha).toDateString() === new Date().toDateString()).length;
    const ingresosTotales = pedidosRestaurante.reduce((total, pedido) => total + pedido.total, 0);
    
    setEstadisticas({
      totalPedidos,
      pedidosHoy,
      ingresosTotales
    });
  }, []);

  // Función para agregar nuevo combo
  const agregarCombo = () => {
    if (!nuevoCombo.numero || !nuevoCombo.descripcion || !nuevoCombo.precio) {
      Alert.alert('Datos incompletos', 'Por favor complete todos los campos del combo.');
      return;
    }
    
    const numero = parseInt(nuevoCombo.numero);
    const precio = parseFloat(nuevoCombo.precio);
    
    if (numero < 1 || numero > 9) {
      Alert.alert('Número inválido', 'El número de combo debe estar entre 1 y 9.');
      return;
    }
    
    if (restaurante.combos.some(c => c.numero === numero)) {
      Alert.alert('Combo existente', 'Ya existe un combo con este número.');
      return;
    }
    
    // En una app real, esto actualizaría el backend
    const comboActualizado = {
      numero,
      descripcion: nuevoCombo.descripcion,
      precio
    };
    
    // Actualizar estado local (en una app real esto vendría del backend)
    restaurante.combos = [...restaurante.combos, comboActualizado];
    setNuevoCombo({ numero: '', descripcion: '', precio: '' });
    setModalVisible(false);
    Alert.alert('Combo agregado', 'El nuevo combo ha sido agregado al menú.');
  };

  // Función para actualizar estado del pedido
  const actualizarEstadoPedido = (pedidoId, nuevoEstado) => {
    // En una app real, esto actualizaría el backend
    const pedidosActualizados = pedidos.map(p => 
      p.id === pedidoId ? {...p, estado: nuevoEstado} : p
    );
    
    setPedidos(pedidosActualizados);
    
    // Si el estado es "en camino", actualizar repartidor a ocupado
    if (nuevoEstado === 'en camino') {
      const pedido = pedidos.find(p => p.id === pedidoId);
      const repartidoresActualizados = repartidores.map(r => 
        r.cedula === pedido.repartidor ? {...r, estado: 'ocupado'} : r
      );
      setRepartidores(repartidoresActualizados);
    }
    
    Alert.alert('Estado actualizado', `El pedido ahora está "${nuevoEstado}".`);
  };

  // Función para obtener nombre del cliente
  const obtenerNombreCliente = (cedulaCliente) => {
    const cliente = clientes.find(c => c.cedula === cedulaCliente);
    return cliente ? cliente.nombre : 'Cliente no encontrado';
  };

  // Función para obtener nombre del repartidor
  const obtenerNombreRepartidor = (cedulaRepartidor) => {
    const repartidor = repartidores.find(r => r.cedula === cedulaRepartidor);
    return repartidor ? repartidor.nombre : 'Repartidor no asignado';
  };

  // Función para formatear fecha
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString() + ' ' + fecha.toLocaleTimeString();
  };

  return (
    <ScrollView contentContainerStyle={styles.dashboardContainer}>
      <Text style={styles.bienvenida}>Panel de control - {restaurante.nombre}</Text>
      <Text style={styles.infoText}>Tipo de comida: {restaurante.tipoComida}</Text>
      
      {/* Estadísticas rápidas */}
      <View style={styles.estadisticasContainer}>
        <View style={styles.estadisticaCard}>
          <Text style={styles.estadisticaNumero}>{estadisticas.totalPedidos}</Text>
          <Text style={styles.estadisticaLabel}>Pedidos totales</Text>
        </View>
        <View style={styles.estadisticaCard}>
          <Text style={styles.estadisticaNumero}>{estadisticas.pedidosHoy}</Text>
          <Text style={styles.estadisticaLabel}>Pedidos hoy</Text>
        </View>
        <View style={styles.estadisticaCard}>
          <Text style={styles.estadisticaNumero}>₡{estadisticas.ingresosTotales.toLocaleString()}</Text>
          <Text style={styles.estadisticaLabel}>Ingresos totales</Text>
        </View>
      </View>
      
      {/* Sección de pedidos */}
      <Text style={styles.sectionTitle}>Pedidos recientes</Text>
      {pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={[
                styles.pedidoCard,
                item.estado === 'entregado' && styles.pedidoEntregado,
                item.estado === 'en camino' && styles.pedidoEnCamino,
                item.estado === 'en preparación' && styles.pedidoEnPreparacion
              ]}
              onPress={() => setPedidoSeleccionado(item)}
            >
              <Text style={styles.pedidoId}>Pedido #{item.id.split('-')[1]}</Text>
              <Text>Cliente: {obtenerNombreCliente(item.cliente)}</Text>
              <Text>Repartidor: {obtenerNombreRepartidor(item.repartidor)}</Text>
              <Text>Estado: {item.estado}</Text>
              <Text>Total: ₡{item.total.toLocaleString()}</Text>
              <Text>Fecha: {formatearFecha(item.fecha)}</Text>
              
              {item.calificacion && (
                <Text>Calificación: {'★'.repeat(item.calificacion)}{'☆'.repeat(5 - item.calificacion)}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No hay pedidos recientes</Text>
      )}
      
      {/* Sección de combos */}
      <Text style={styles.sectionTitle}>Combos disponibles</Text>
      <FlatList
        data={restaurante.combos}
        keyExtractor={(item) => item.numero.toString()}
        renderItem={({item}) => (
          <View style={styles.comboContainer}>
            <View style={styles.comboInfo}>
              <Text style={styles.comboTitle}>Combo #{item.numero}</Text>
              <Text style={styles.comboDesc}>{item.descripcion}</Text>
              <Text style={styles.comboPrice}>₡{item.precio.toLocaleString()}</Text>
            </View>
          </View>
        )}
      />
      
      <AuthButton 
        title="Agregar nuevo combo" 
        onPress={() => setModalVisible(true)}
        style={styles.primaryButton}
      />
      
      {/* Modal para agregar nuevo combo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar nuevo combo</Text>
            
            <Text style={styles.inputLabel}>Número de combo (1-9)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={nuevoCombo.numero}
              onChangeText={(text) => setNuevoCombo({...nuevoCombo, numero: text})}
              placeholder="Ej: 3"
            />
            
            <Text style={styles.inputLabel}>Descripción</Text>
            <TextInput
              style={styles.input}
              value={nuevoCombo.descripcion}
              onChangeText={(text) => setNuevoCombo({...nuevoCombo, descripcion: text})}
              placeholder="Ej: Casado con pescado"
            />
            
            <Text style={styles.inputLabel}>Precio</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={nuevoCombo.precio}
              onChangeText={(text) => setNuevoCombo({...nuevoCombo, precio: text})}
              placeholder="Ej: 4500"
            />
            
            <View style={styles.modalButtons}>
              <AuthButton 
                title="Cancelar"
                onPress={() => {
                  setNuevoCombo({ numero: '', descripcion: '', precio: '' });
                  setModalVisible(false);
                }}
                style={styles.secondaryButton}
              />
              <AuthButton 
                title="Agregar combo"
                onPress={agregarCombo}
                style={styles.primaryButton}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Modal de detalles del pedido */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!pedidoSeleccionado}
        onRequestClose={() => setPedidoSeleccionado(null)}
      >
        {pedidoSeleccionado && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles del pedido #{pedidoSeleccionado.id.split('-')[1]}</Text>
              
              <Text>Cliente: {obtenerNombreCliente(pedidoSeleccionado.cliente)}</Text>
              <Text>Repartidor: {obtenerNombreRepartidor(pedidoSeleccionado.repartidor)}</Text>
              <Text>Fecha: {formatearFecha(pedidoSeleccionado.fecha)}</Text>
              <Text>Estado actual: {pedidoSeleccionado.estado}</Text>
              
              <Text style={styles.sectionTitle}>Combos solicitados:</Text>
              {pedidoSeleccionado.combos.map(combo => {
                const comboInfo = restaurante.combos.find(c => c.numero === combo.numero);
                return (
                  <View key={combo.numero} style={styles.comboItem}>
                    <Text>{combo.cantidad}x Combo #{combo.numero}</Text>
                    <Text>{comboInfo?.descripcion || 'Descripción no disponible'}</Text>
                    <Text>₡{(comboInfo?.precio || 0) * combo.cantidad}</Text>
                  </View>
                );
              })}
              
              <Text style={styles.totalPedido}>Total: ₡{pedidoSeleccionado.total.toLocaleString()}</Text>
              
              {pedidoSeleccionado.calificacion && (
                <Text style={styles.calificacionText}>
                  Calificación del servicio: {'★'.repeat(pedidoSeleccionado.calificacion)}{'☆'.repeat(5 - pedidoSeleccionado.calificacion)}
                </Text>
              )}
              
              {/* Acciones según estado del pedido */}
              <View style={styles.accionesPedido}>
                {pedidoSeleccionado.estado === 'en preparación' && (
                  <AuthButton 
                    title="Marcar como en camino"
                    onPress={() => {
                      actualizarEstadoPedido(pedidoSeleccionado.id, 'en camino');
                      setPedidoSeleccionado(null);
                    }}
                    style={styles.primaryButton}
                  />
                )}
                
                {pedidoSeleccionado.estado === 'en camino' && (
                  <AuthButton 
                    title="Marcar como entregado"
                    onPress={() => {
                      actualizarEstadoPedido(pedidoSeleccionado.id, 'entregado');
                      setPedidoSeleccionado(null);
                    }}
                    style={styles.successButton}
                  />
                )}
                
                <AuthButton 
                  title="Cerrar"
                  onPress={() => setPedidoSeleccionado(null)}
                  style={styles.secondaryButton}
                />
              </View>
            </View>
          </View>
        )}
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