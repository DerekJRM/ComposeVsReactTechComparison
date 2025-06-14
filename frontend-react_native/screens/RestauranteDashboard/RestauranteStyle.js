import { StyleSheet } from 'react-native';

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
    width: 250,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  mobileSidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  webSidebar: {
    width: 300,
  },
  profileSection: {
    marginBottom: 30,
  },
  sidebarLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  sidebarButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#e9ecef',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  sidebarButtonText: {
    fontSize: 16,
    color: '#212529',
  },
  activeTabText: {
    color: '#fff',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#dc3545',
  },
  logoutButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mobileContent: {
    paddingTop: 10,
  },
  webContent: {
    padding: 20,
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
    backgroundColor: '#007bff',
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
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pedidoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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
    color: '#ffc107',
  },
  estadoCamino: {
    color: '#17a2b8',
  },
  estadoEntregado: {
    color: '#28a745',
  },
  combosContainer: {
    flex: 1,
  },
  addComboButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  addComboButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  comboCard: {
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
  comboTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comboDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  comboPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 10,
  },
  comboButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comboButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#17a2b8',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  comboButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  listContainer: {
    padding: 15,
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
    color: '#343a40',
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
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#495057',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
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
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  caminoButton: {
    backgroundColor: '#17a2b8',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#2c3e50',  // Fondo oscuro
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#34495e',
  },
  mobileSidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: '#2c3e50',  // Fondo oscuro para mobile
  },
  profileSection: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
    paddingBottom: 20,
  },
  sidebarLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 15,
    tintColor: '#ecf0f1',  // Color claro para el logo
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ecf0f1',  // Texto claro
  },
  userInfo: {
    fontSize: 14,
    color: '#bdc3c7',  // Texto gris claro
    marginBottom: 3,
  },
  sidebarButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#34495e',  // Botones con fondo más oscuro
  },
  activeTab: {
    backgroundColor: '#3498db',  // Azul más vivo para pestaña activa
  },
  sidebarButtonText: {
    fontSize: 16,
    color: '#ecf0f1',  // Texto claro
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#e74c3c',  // Rojo para el botón de cerrar sesión
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});