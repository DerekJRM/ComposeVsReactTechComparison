import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // Nuevos estilos para el sidebar móvil
  mobileSidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#fff',
    zIndex: 1000,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 999,
  },
  
  sidebarToggleButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  
  sidebarToggleButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  
  // Ajustes para el header móvil
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  
  mobileWelcome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  
  mobileInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  
  // Ajustes para el contenido móvil
  mobileContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Estilos existentes del sidebar (reutilizados para móvil)
  sidebar: {
    width: 280,
    backgroundColor: '#fff',
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  
  profileSection: {
    marginBottom: 30,
  },
  
  welcomeText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  
  userInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  
  sidebarButton: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  
  sidebarButtonText: {
    fontSize: 16,
    color: '#333',
  },
  
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  
  activeTabText: {
    color: '#fff',
  },
  
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
  },
  
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
  mobileContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
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
  mobileContent: {
    flex: 1,
    padding: 10,
  },
  desktopContent: {
    flex: 1,
    padding: 20,
  },
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    marginLeft: 10,
  },
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
  estadoEnPreparacion: {
    color: '#f39c12',
  },
  estadoEnCamino: {
    color: '#3498db',
  },
  estadoEntregado: {
    color: '#2ecc71',
  },
  estadoCancelado: {
    color: '#e74c3c',
  },
  estadoOtro: {
    color: '#7f8c8d',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d',
  },
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
  enCaminoButton: {
    backgroundColor: '#3498db',
  },
  entregadoButton: {
    backgroundColor: '#2ecc71',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quejaCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
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
  quejaCardMobile: {
    width: '100%',
  },
  quejaCardDesktop: {
    width: '48%',
    marginRight: '2%',
  },
  quejaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  quejaInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  quejaDescripcion: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    fontStyle: 'italic',
  },
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
  aceptarButton: {
    backgroundColor: '#2ecc71',
    marginBottom: 5,
  },
  rechazarButton: {
    backgroundColor: '#e74c3c',
  },
});