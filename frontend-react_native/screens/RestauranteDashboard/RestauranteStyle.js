import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  menuButton: {
  position: 'absolute',
  bottom: 20, // Cambiado de top a bottom
  left: 20,   // Aumentado de 10 a 20 para no pegar a la esquina
  zIndex: 10,
  backgroundColor: '#2c3e50',
  padding: 12, // Aumentado el padding
  borderRadius: 30, // Más redondeado
  width: 50,   // Ancho fijo
  height: 50,  // Alto fijo
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5, // Sombra para Android
  shadowColor: '#000', // Sombra para iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
},
menuButtonText: {
  color: '#fff',
  fontSize: 24, // Tamaño aumentado
  fontWeight: 'bold',
},
  sidebar: {
    backgroundColor: '#2c3e50',
    padding: 20,
    justifyContent: 'flex-start',
  },
  mobileSidebar: {
    width: '80%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  webSidebar: {
    width: 250,
  },
  profileSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
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
  },
  sidebarButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'right',
  },
  sidebarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: '#2c3e50',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    marginTop: 'auto',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  mobileContent: {
    width: '100%',
  },
  webContent: {
    padding: 30,
  },
  listContainer: {
    paddingBottom: 20,
  },
  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pedidoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pedidoInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  pedidoEstado: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  estadoPreparacion: {
    color: '#f39c12',
  },
  estadoCamino: {
    color: '#3498db',
  },
  estadoEntregado: {
    color: '#2ecc71',
  },
  combosContainer: {
    flex: 1,
  },
  comboCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comboTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comboDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
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
  },
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
  },
  modalContent: {
    flex: 1,
  },
  detailSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    color: '#666',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  caminoButton: {
    backgroundColor: '#3498db',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    width: '48%',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    width: '48%',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  // Añade estos estilos a tu archivo RestauranteStyle.js
overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 4,
},
overlayTouchable: {
  flex: 1,
},
});