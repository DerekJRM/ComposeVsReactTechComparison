import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 300,
    backgroundColor: '#000', // Negro para el sidebar
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  webSidebar: {
    position: 'fixed',
    height: '100%',
  },
  mobileSidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    width: 280,
  },
  profileSection: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 20,
  },
  sidebarLogo: {
  width: '100%',
  height: 120,
  marginBottom: 15,
  resizeMode: 'contain', 
  backgroundColor: 'transparent', 
},
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff', // Blanco para texto
  },
  userInfo: {
    fontSize: 14,
    color: '#ccc', // Gris claro para información secundaria
    marginBottom: 3,
  },
  sidebarButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#333', // Fondo oscuro para botones
  },
  activeTab: {
    backgroundColor: '#06C167', // Verde UberEats para pestaña activa
  },
  sidebarButtonText: {
    fontSize: 16,
    color: '#fff', // Blanco para texto de botones
  },
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: '#e74c3c', // Rojo para botón de logout
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco para el contenido
  },
  mobileContent: {
    paddingTop: 10,
  },
  webContent: {
    padding: 30,
    paddingLeft: 40,
    paddingRight: 40,
    marginLeft: 300, // Para dejar espacio al sidebar fijo
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebarToggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#06C167', // Verde UberEats
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 100,
  },
  sidebarToggleButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#06C167', // Borde izquierdo verde UberEats
  },
  webPedidoCard: {
    width: '48%',
    padding: 10,
  },
  webPedidoCardInner: {
    width: '100%',
  },
  pedidoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000', // Texto negro
  },
  pedidoInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  pedidoEstado: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  estadoPreparacion: {
    color: '#FFB800', // Amarillo para "en preparación"
  },
  estadoCamino: {
    color: '#06C167', // Verde UberEats para "en camino"
  },
  estadoEntregado: {
    color: '#00A862', // Verde más oscuro para "entregado"
  },
  combosContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  addComboButton: {
    backgroundColor: '#06C167', // Verde UberEats
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  },
  addComboButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  comboCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#06C167', // Borde izquierdo verde UberEats
  },
  webComboCard: {
    width: '48%',
    padding: 10,
  },
  webComboCardInner: {
    width: '100%',
  },
  comboTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  comboDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  comboPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#06C167', // Verde UberEats para precios
    marginBottom: 10,
  },
  comboButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comboButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#06C167', // Verde UberEats para editar
  },
  deleteButton: {
    backgroundColor: '#E02020', // Rojo para eliminar
  },
  comboButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 80, // Espacio para el botón de agregar combo
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#6c757d',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  mobileLogo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  detailSection: {
    marginBottom: 25,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#6c757d',
    width: '40%',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    width: '60%',
    textAlign: 'right',
    color: '#000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#06C167', // Verde UberEats
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  caminoButton: {
    backgroundColor: '#06C167', // Verde UberEats
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webPedidoGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  webComboGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  floatingComboButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#06C167', // Verde UberEats
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingComboButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -3,
  },

  // Botón flotante base
  addComboButton: {
    position: 'absolute',
    backgroundColor: '#06C167', // Verde UberEats
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  // Versión para pantallas grandes (tablet/desktop)
  addComboButtonLarge: {
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
  },

  // Versión para pantallas pequeñas (mobile)
  addComboButtonSmall: {
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
  },

  // Contenedores principales
  combosContainer: {
    flex: 1,
    position: 'relative',
  },

  pedidosContainer: {
    flex: 1,
    position: 'relative',
  },

  // Ajustes para tarjetas según tamaño de pantalla
  listPadding: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: Platform.OS === 'web' ? 20 : 10,
  },

  addComboButtonLarge: {
    bottom: Platform.OS === 'web' ? 30 : 25,
    right: Platform.OS === 'web' ? 30 : 25,
    width: Platform.OS === 'web' ? 60 : 50,
    height: Platform.OS === 'web' ? 60 : 50,
  },
});