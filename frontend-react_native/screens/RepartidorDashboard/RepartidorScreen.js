import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, FlatList, Modal, TouchableOpacity, Alert } from 'react-native';
import AuthButton from '../../components/AuthButton';
import { styles } from '../../styles/globalStyles';
import { usuarios } from '../../data/data';

export default function RepartidorScreen({ repartidor, onLogout }) {
  // Estados
  const [pedidosAsignados, setPedidosAsignados] = useState([]);
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [restaurantes, setRestaurantes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    totalEntregas: 0,
    entregasHoy: 0,
    ingresosHoy: 0,
    ingresosTotales: 0,
    kmRecorridos: 0
  });

  // Cargar datos iniciales
  useEffect(() => {
    // Filtrar restaurantes y clientes
    const restaurantesData = usuarios.filter(u => u.rol === 'restaurante');
    const clientesData = usuarios.filter(u => u.rol === 'cliente');
    
    setRestaurantes(restaurantesData);
    setClientes(clientesData);
    
    // Simular pedidos asignados (en una app real esto vendría de una API)
    const pedidosAsignadosData = [
      {
        id: 'PED-003',
        restaurante: 'J-40404040',
        cliente: '10101010',
        combos: [{numero: 1, cantidad: 1}, {numero: 2, cantidad: 2}],
        estado: 'en camino',
        fecha: new Date().toISOString(),
        total: 14000,
        distancia: 5, // km
        esFeriado: false
      }
    ].filter(p => p.estado !== 'entregado');
    
    // Simular historial de pedidos
    const historialData = [
      {
        id: 'PED-001',
        restaurante: 'J-40404040',
        cliente: '10101010',
        combos: [{numero: 1, cantidad: 2}],
        estado: 'entregado',
        fecha: '2023-05-15T10:30:00',
        total: 8000,
        distancia: 3,
        esFeriado: false,
        calificacion: 4,
        queja: null
      },
      {
        id: 'PED-002',
        restaurante: 'J-40404040',
        cliente: '20202020',
        combos: [{numero: 2, cantidad: 1}],
        estado: 'entregado',
        fecha: '2023-05-16T12:45:00',
        total: 5000,
        distancia: 7,
        esFeriado: true,
        calificacion: 2,
        queja: 'Llegó tarde'
      }
    ];
    
    setPedidosAsignados(pedidosAsignadosData);
    setHistorialPedidos(historialData);
    
    // Calcular estadísticas
    const totalEntregas = historialData.length;
    const entregasHoy = historialData.filter(p => 
      new Date(p.fecha).toDateString() === new Date().toDateString()).length;
    const ingresosHoy = historialData
      .filter(p => new Date(p.fecha).toDateString() === new Date().toDateString())
      .reduce((total, pedido) => total + calcularGananciaPedido(pedido), 0);
    const ingresosTotales = historialData
      .reduce((total, pedido) => total + calcularGananciaPedido(pedido), 0);
    const kmRecorridos = historialData.reduce((total, pedido) => total + pedido.distancia, 0);
    
    setEstadisticas({
      totalEntregas,
      entregasHoy,
      ingresosHoy,
      ingresosTotales,
      kmRecorridos
    });
  }, []);

  // Función para calcular ganancia por pedido
  const calcularGananciaPedido = (pedido) => {
    const costoPorKm = pedido.esFeriado ? repartidor.costoPorKm.feriado : repartidor.costoPorKm.habil;
    return pedido.distancia * costoPorKm;
  };

  // Función para marcar pedido como entregado
  const marcarComoEntregado = (pedidoId) => {
    // En una app real, esto actualizaría el backend
    const pedido = pedidosAsignados.find(p => p.id === pedidoId);
    
    if (!pedido) return;
    
    // Actualizar estado del pedido
    const pedidoActualizado = {
      ...pedido,
      estado: 'entregado',
      fechaEntrega: new Date().toISOString()
    };
    
    // Mover a historial
    setHistorialPedidos([...historialPedidos, pedidoActualizado]);
    
    // Quitar de pedidos asignados
    setPedidosAsignados(pedidosAsignados.filter(p => p.id !== pedidoId));
    
    // Actualizar estado del repartidor a disponible
    const repartidorActualizado = {
      ...repartidor,
      estado: 'disponible',
      kmDiarios: repartidor.kmDiarios + pedido.distancia
    };
    
    // En una app real, esto actualizaría el contexto o el estado global
    Alert.alert('Pedido entregado', 'El pedido ha sido marcado como entregado correctamente.');
    setModalVisible(false);
  };

  // Función para obtener nombre del cliente
  const obtenerNombreCliente = (cedulaCliente) => {
    const cliente = clientes.find(c => c.cedula === cedulaCliente);
    return cliente ? cliente.nombre : 'Cliente no encontrado';
  };

  // Función para obtener nombre del restaurante
  const obtenerNombreRestaurante = (cedulaRestaurante) => {
    const restaurante = restaurantes.find(r => r.cedula === cedulaRestaurante);
    return restaurante ? restaurante.nombre : 'Restaurante no encontrado';
  };

  // Función para formatear fecha
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString() + ' ' + fecha.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  // Función para formatear dinero
  const formatearDinero = (monto) => {
    return `₡${monto.toLocaleString()}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.dashboardContainer}>
      <Text style={styles.bienvenida}>Panel de repartidor: {repartidor.nombre}</Text>
      <Text style={styles.infoText}>Estado: {repartidor.estado}</Text>
      <Text style={styles.infoText}>Amonestaciones: {repartidor.amonestaciones}/4</Text>
      {repartidor.amonestaciones >= 3 && (
        <Text style={styles.warningText}>¡Advertencia! Con 4 amonestaciones quedará fuera de la plataforma.</Text>
      )}
      
      {/* Estadísticas rápidas */}
      <View style={styles.estadisticasContainer}>
        <View style={styles.estadisticaCard}>
          <Text style={styles.estadisticaNumero}>{estadisticas.entregasHoy}</Text>
          <Text style={styles.estadisticaLabel}>Entregas hoy</Text>
        </View>
        <View style={styles.estadisticaCard}>
          <Text style={styles.estadisticaNumero}>{formatearDinero(estadisticas.ingresosHoy)}</Text>
          <Text style={styles.estadisticaLabel}>Ganancias hoy</Text>
        </View>
        <View style={styles.estadisticaCard}>
          <Text style={styles.estadisticaNumero}>{estadisticas.kmRecorridos} km</Text>
          <Text style={styles.estadisticaLabel}>Total recorrido</Text>
        </View>
      </View>
      
      {/* Pedidos asignados */}
      <Text style={styles.sectionTitle}>Pedidos asignados</Text>
      {pedidosAsignados.length > 0 ? (
        <FlatList
          data={pedidosAsignados}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.pedidoCard}
              onPress={() => {
                setPedidoSeleccionado(item);
                setModalVisible(true);
              }}
            >
              <Text style={styles.pedidoId}>Pedido #{item.id.split('-')[1]}</Text>
              <Text>Restaurante: {obtenerNombreRestaurante(item.restaurante)}</Text>
              <Text>Cliente: {obtenerNombreCliente(item.cliente)}</Text>
              <Text>Distancia: {item.distancia} km</Text>
              <Text>Ganancia estimada: {formatearDinero(calcularGananciaPedido(item))}</Text>
              <Text>Estado: {item.estado}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No tienes pedidos asignados</Text>
      )}
      
      {/* Historial de pedidos */}
      <Text style={styles.sectionTitle}>Historial de entregas</Text>
      {historialPedidos.length > 0 ? (
        <FlatList
          data={historialPedidos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={[
                styles.pedidoCard,
                item.queja && styles.pedidoConQueja
              ]}
              onPress={() => {
                setPedidoSeleccionado(item);
                setModalVisible(true);
              }}
            >
              <Text style={styles.pedidoId}>Pedido #{item.id.split('-')[1]}</Text>
              <Text>Restaurante: {obtenerNombreRestaurante(item.restaurante)}</Text>
              <Text>Cliente: {obtenerNombreCliente(item.cliente)}</Text>
              <Text>Fecha: {formatearFecha(item.fecha)}</Text>
              <Text>Distancia: {item.distancia} km</Text>
              <Text>Ganancia: {formatearDinero(calcularGananciaPedido(item))}</Text>
              {item.calificacion && (
                <Text>Calificación: {'★'.repeat(item.calificacion)}{'☆'.repeat(5 - item.calificacion)}</Text>
              )}
              {item.queja && <Text style={styles.quejaText}>Queja: {item.queja}</Text>}
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No hay entregas registradas</Text>
      )}
      
      {/* Modal de detalles del pedido */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {pedidoSeleccionado && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles del pedido #{pedidoSeleccionado.id.split('-')[1]}</Text>
              
              <Text>Restaurante: {obtenerNombreRestaurante(pedidoSeleccionado.restaurante)}</Text>
              <Text>Cliente: {obtenerNombreCliente(pedidoSeleccionado.cliente)}</Text>
              <Text>Fecha: {formatearFecha(pedidoSeleccionado.fecha)}</Text>
              <Text>Distancia: {pedidoSeleccionado.distancia} km</Text>
              <Text>Ganancia: {formatearDinero(calcularGananciaPedido(pedidoSeleccionado))}</Text>
              <Text>Estado: {pedidoSeleccionado.estado}</Text>
              
              <Text style={styles.sectionTitle}>Combos:</Text>
              {pedidoSeleccionado.combos.map(combo => (
                <View key={combo.numero} style={styles.comboItem}>
                  <Text>{combo.cantidad}x Combo #{combo.numero}</Text>
                </View>
              ))}
              
              {pedidoSeleccionado.calificacion && (
                <Text style={styles.calificacionText}>
                  Calificación: {'★'.repeat(pedidoSeleccionado.calificacion)}{'☆'.repeat(5 - pedidoSeleccionado.calificacion)}
                </Text>
              )}
              
              {pedidoSeleccionado.queja && (
                <Text style={styles.quejaText}>Queja del cliente: {pedidoSeleccionado.queja}</Text>
              )}
              
              {/* Acciones según estado del pedido */}
              <View style={styles.accionesPedido}>
                {pedidoSeleccionado.estado === 'en camino' && (
                  <AuthButton 
                    title="Marcar como entregado"
                    onPress={() => marcarComoEntregado(pedidoSeleccionado.id)}
                    style={styles.successButton}
                  />
                )}
                
                <AuthButton 
                  title="Cerrar"
                  onPress={() => setModalVisible(false)}
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