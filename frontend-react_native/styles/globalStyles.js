import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  dashboardContainer: {
    flexGrow: 1,
    backgroundColor: '#f3f3f3',
    padding: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333'
  },
  bienvenida: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#444'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555'
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16
  },
  buttonBase: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonTextBase: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginButton: {
    backgroundColor: '#4CAF50',
  },
  loginButtonText: {
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    marginTop: 30,
    marginBottom: 20
  },
  logoutButtonText: {
    color: '#fff',
  },
  comboContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  comboTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  comboDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  comboPrice: {
    fontWeight: 'bold',
    color: '#2E7D32'
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  
  restauranteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  restauranteNombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  restauranteTipo: {
    color: '#666',
  },
  
  restauranteDireccion: {
    color: '#888',
    fontSize: 12,
  },
  
  pedidoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  
  noItemsText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#555',
  },
  
  comboItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  
  comboInfo: {
    flex: 1,
  },
  
  comboNombre: {
    fontWeight: 'bold',
  },
  
  comboPrecio: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  
  comboActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  comboButton: {
    backgroundColor: '#eee',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  comboCantidad: {
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  
  resumenPedido: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  
  resumenTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  
  resumenTotal: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  
  primaryButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    marginLeft: 10,
  },
  
  secondaryButton: {
    backgroundColor: '#f44336',
    flex: 1,
    marginRight: 10,
  },
  
  facturaTotales: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  
  facturaTotal: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  
  estadoPedido: {
    marginTop: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  
  calificacionContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  
  estrellasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  
  estrella: {
    fontSize: 24,
    color: '#FFD700',
    marginHorizontal: 5,
  },

  estadisticasContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
},

estadisticaCard: {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
  flex: 1,
  marginHorizontal: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},

estadisticaNumero: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#4CAF50',
},

estadisticaLabel: {
  fontSize: 12,
  color: '#666',
},

pedidoCard: {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 8,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},

pedidoEnPreparacion: {
  borderLeftWidth: 4,
  borderLeftColor: '#FFC107',
},

pedidoEnCamino: {
  borderLeftWidth: 4,
  borderLeftColor: '#2196F3',
},

pedidoEntregado: {
  borderLeftWidth: 4,
  borderLeftColor: '#4CAF50',
},

pedidoId: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 5,
},

comboContainer: {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 8,
  marginBottom: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

comboTitle: {
  fontWeight: 'bold',
},

comboDesc: {
  color: '#666',
},

comboPrice: {
  color: '#4CAF50',
  fontWeight: 'bold',
},

inputLabel: {
  marginTop: 10,
  marginBottom: 5,
  color: '#555',
},

input: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
},

comboItem: {
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},

totalPedido: {
  fontWeight: 'bold',
  fontSize: 16,
  marginTop: 10,
  textAlign: 'right',
},

calificacionText: {
  marginTop: 10,
  color: '#FFD700',
  fontSize: 16,
},

accionesPedido: {
  marginTop: 20,
},

successButton: {
  backgroundColor: '#4CAF50',
  marginBottom: 10,
},
warningText: {
  color: '#FF5722',
  fontWeight: 'bold',
  marginVertical: 10,
  textAlign: 'center',
},

pedidoConQueja: {
  borderLeftWidth: 4,
  borderLeftColor: '#F44336',
},

quejaText: {
  color: '#F44336',
  fontStyle: 'italic',
  marginTop: 5,
},

calificacionText: {
  color: '#FFD700',
  fontSize: 16,
  marginTop: 10,
},

sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 20,
  marginBottom: 10,
  color: '#333',
},

noItemsText: {
  textAlign: 'center',
  color: '#888',
  marginVertical: 20,
},

modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},

modalContent: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  width: '90%',
  maxHeight: '80%',
},

modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},

comboItem: {
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},

accionesPedido: {
  marginTop: 20,
},

successButton: {
  backgroundColor: '#4CAF50',
  marginBottom: 10,
},

secondaryButton: {
  backgroundColor: '#f44336',
},

estadisticasContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
},

estadisticaCard: {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
  flex: 1,
  marginHorizontal: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},

estadisticaNumero: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#4CAF50',
},

estadisticaLabel: {
  fontSize: 12,
  color: '#666',
},

pedidoCard: {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 8,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},

pedidoId: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 5,
},
container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardContainer: {
    flexGrow: 1,
    padding: 16,
  },
  bienvenida: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
  },
  restauranteInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restauranteImagen: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  restauranteInfoText: {
    flex: 1,
  },
  restauranteNombre: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  restauranteTipo: {
    color: '#666',
    fontSize: 14,
  },
  restauranteDireccion: {
    color: '#666',
    fontSize: 14,
  },
  restauranteRating: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  pedidoRestaurante: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  calificacionContainer: {
    marginTop: 10,
  },
  estrellasContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  estrella: {
    fontSize: 24,
    color: '#ddd',
    marginRight: 5,
  },
  estrellaSeleccionada: {
    color: '#FFD700',
  },
  noItemsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalHeader: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  comboItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comboInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  comboImagen: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  comboTextInfo: {
    flex: 1,
  },
  comboNombre: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  comboDescripcion: {
    color: '#666',
    fontSize: 14,
  },
  comboPrecio: {
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  comboActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comboButton: {
    backgroundColor: '#f0f0f0',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comboButtonText: {
    fontSize: 18,
  },
  comboCantidad: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  resumenPedido: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  resumenTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  resumenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  resumenItemText: {
    flex: 2,
  },
  resumenItemPrecio: {
    flex: 1,
    textAlign: 'right',
  },
  resumenTotalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 10,
    paddingTop: 10,
  },
  resumenTotal: {
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  comboDetalleImagen: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  comboDetallePrecio: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 10,
  },
  comboDetalleDescripcion: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  comboDetalleIngredientes: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 20,
  },
  comboDetalleActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comboDetalleButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  comboDetalleButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  comboDetalleCloseButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  comboDetalleCloseButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  facturaNumero: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  facturaFecha: {
    color: '#666',
    marginBottom: 15,
  },
  facturaInfoContainer: {
    marginBottom: 15,
  },
  facturaLabel: {
    fontWeight: 'bold',
  },
  facturaValue: {
    marginBottom: 8,
  },
  facturaTotales: {
    marginBottom: 15,
  },
  facturaLineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  facturaLineLabel: {
    fontWeight: 'bold',
  },
  facturaLineValue: {
    fontWeight: 'bold',
  },
  facturaTotalItem: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
    marginTop: 5,
  },
  facturaTotalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  facturaTotalValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2ecc71',
  },
  estadoPedido: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  facturaTiempoEstimado: {
    textAlign: 'center',
    marginVertical: 15,
    fontStyle: 'italic',
    color: '#e67e22',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  bienvenida: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  estadoCliente: {
    fontSize: 16,
    color: '#666',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  restauranteCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  restauranteImagen: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  restauranteInfo: {
    flex: 1,
  },
  restauranteNombre: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  restauranteDetalle: {
    color: '#666',
    fontSize: 14,
  },
  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  pedidoId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});