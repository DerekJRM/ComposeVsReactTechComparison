import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
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
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    justifyContent: 'space-between', // Esto empujará el contenido hacia arriba y abajo
    height: '100%', // Asegura que ocupe toda la altura
  },
  profileSection: {
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 'auto', // Esto empujará el botón hacia abajo
    marginBottom: 20, // Espacio en la parte inferior
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
  userAddress: {
    color: '#bdc3c7',
    fontSize: 14,
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
  mobileAddress: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  mobileButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  mobileHistorialButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  mobileLogoutButton: {
    flex: 1,
  },
  mobileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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

  // Tarjetas de restaurante
  restauranteCard: {
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
  mobileRestauranteCard: {
    width: '100%',
    marginBottom: 10,
  },
  desktopRestauranteCard: {
    width: '32%',
    marginBottom: 15,
  },
  restauranteNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  restauranteInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },

  // Tarjetas de combos
  comboCard: {
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
    }),
  },
  comboCardMobile: {
    width: '100%',
    marginBottom: 10,
  },
  comboCardDesktop: {
    width: '48%',
    marginBottom: 15,
  },
  comboNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  comboDescripcion: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  comboPrecio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 10,
  },
  comboActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
    alignSelf: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  comboCantidad: {
    fontSize: 16,
    fontWeight: 'bold',
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
  quejaButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  quejaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  listContainer: {
    paddingBottom: 20,
  },

  // Resumen de compra
  summaryContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryContainerMobile: {
    padding: 15,
  },
  summaryContainerDesktop: {
    padding: 20,
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

  // Botones del modal
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalButtonsMobile: {
    padding: 10,
  },
  modalButtonsDesktop: {
    padding: 20,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  confirmButton: {
    backgroundColor: '#2ecc71',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Formulario de quejas
  quejaFormContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quejaFormContainerMobile: {
    padding: 15,
  },
  quejaFormContainerDesktop: {
    padding: 20,
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

  // Textos varios
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d',
  },
  noPedidosText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
    // Sidebar móvil
  mobileSidebar: {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: 250,
  backgroundColor: '#f8f8f8',
  padding: 20,
  zIndex: 1000,
  justifyContent: 'space-between', // Igual que en el desktop
},
  mobileOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
  menuIcon: {
    fontSize: 24,
    color: '#2c3e50',
    marginRight: 15,
  },
  mobileHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  // Agrega estos estilos al final del archivo ClienteStyle.js
floatingSidebarButton: {
  position: 'absolute',
  bottom: 30,
  right: 30,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#3498db',
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  zIndex: 100,
},
floatingSidebarButtonText: {
  fontSize: 28,
  color: '#fff',
},
});