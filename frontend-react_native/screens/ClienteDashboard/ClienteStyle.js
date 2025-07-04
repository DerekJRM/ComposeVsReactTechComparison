import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // Contenedores principales
  containerBase: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco
  },
  mobileContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco
  },
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff', // Fondo blanco
  },

  // Sidebar (modificado a negro como Uber Eats)
  sidebar: {
    width: 280,
    backgroundColor: '#000000', // Fondo negro
    padding: 25,
    borderRightWidth: 1,
    borderRightColor: '#e9ecef',
    justifyContent: 'space-between',
    height: '100%',
    ...Platform.select({
      web: {
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      },
    }),
  },
  profileSection: {
    marginBottom: 30,
  },
  welcomeText: {
    color: '#a0a0a0', // Gris claro para texto secundario
    fontSize: 16,
    marginBottom: 8,
  },
  userName: {
    color: '#ffffff', // Blanco para texto principal
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  userAddress: {
    color: '#707070', // Gris medio
    fontSize: 14,
    marginBottom: 20,
  },
  sidebarButton: {
    backgroundColor: '#00cc6a', // Verde Uber Eats
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sidebarButtonText: {
    color: '#ffffff', // Texto blanco
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#333333', // Gris oscuro para botón de logout
    padding: 14,
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff', // Texto blanco
    fontWeight: '600',
  },

  // Contenido principal
  mobileContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff', // Fondo blanco
  },
  desktopContent: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff', // Fondo blanco
  },

  // Header móvil
  mobileHeader: {
    marginBottom: 24,
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }
    }),
  },
  mobileWelcome: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000', // Texto negro
    marginBottom: 6,
  },
  mobileAddress: {
    fontSize: 14,
    color: '#707070', // Gris medio
    marginBottom: 16,
  },
  mobileButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mobileHistorialButton: {
    backgroundColor: '#00cc6a', // Verde Uber Eats
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  mobileLogoutButton: {
    backgroundColor: '#333333', // Gris oscuro
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  mobileButtonText: {
    color: '#ffffff', // Texto blanco
    fontWeight: '600',
  },

  // Listas
  mobileListContainer: {
    paddingBottom: 20,
  },
  desktopListContainer: {
    padding: 12,
  },
  desktopColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // Tarjetas de restaurante
  restauranteCard: {
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#f0f0f0', // Borde gris muy claro
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }
    }),
  },
  mobileRestauranteCard: {
    width: '100%',
    marginBottom: 12,
  },
  desktopRestauranteCard: {
    width: '32%',
    marginBottom: 16,
  },
  restauranteNombre: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000', // Texto negro
    marginBottom: 6,
  },
  restauranteInfo: {
    fontSize: 14,
    color: '#707070', // Gris medio
    marginBottom: 4,
    lineHeight: 20,
  },

  // Tarjetas de combos
  comboCard: {
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#f0f0f0', // Borde gris muy claro
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }
    }),
  },
  comboCardMobile: {
    width: '100%',
    marginBottom: 12,
  },
  comboCardDesktop: {
    width: '48%',
    marginBottom: 16,
  },
  comboNombre: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000', // Texto negro
    marginBottom: 6,
  },
  comboDescripcion: {
    fontSize: 14,
    color: '#707070', // Gris medio
    marginBottom: 8,
    lineHeight: 20,
  },
  comboPrecio: {
    fontSize: 17,
    fontWeight: '600',
    color: '#00cc6a', // Verde Uber Eats
    marginBottom: 12,
  },
  comboActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 110,
    alignSelf: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#00cc6a', // Verde Uber Eats
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    color: '#ffffff', // Texto blanco
    fontSize: 18,
    fontWeight: '600',
  },
  comboCantidad: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000', // Texto negro
  },

  // Tarjetas de pedidos
  pedidoCard: {
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#f0f0f0', // Borde gris muy claro
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }
    }),
  },
  pedidoCardMobile: {
    width: '100%',
    marginBottom: 12,
  },
  pedidoCardDesktop: {
    width: '48%',
    marginBottom: 16,
  },
  pedidoTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000', // Texto negro
    marginBottom: 6,
  },
  pedidoInfo: {
    fontSize: 14,
    color: '#707070', // Gris medio
    marginBottom: 4,
    lineHeight: 20,
  },
  quejaButton: {
    backgroundColor: '#333333', // Gris oscuro
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quejaButtonText: {
    color: '#ffffff', // Texto blanco
    fontWeight: '600',
  },

  // Modales
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco
  },
  modalContainerMobile: {
    padding: 16,
  },
  modalContainerDesktop: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#ffffff', // Fondo blanco
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  backButton: {
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#00cc6a', // Verde Uber Eats
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000', // Texto negro
  },
  listContainer: {
    paddingBottom: 20,
  },

  // Resumen de compra
  summaryContainer: {
    backgroundColor: '#ffffff', // Fondo blanco
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
      }
    }),
  },
  summaryContainerMobile: {
    padding: 16,
  },
  summaryContainerDesktop: {
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#707070', // Gris medio
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000', // Texto negro
  },
  totalLabel: {
    fontSize: 18,
    color: '#000000', // Texto negro
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00cc6a', // Verde Uber Eats
  },

  // Botones del modal
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff', // Fondo blanco
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingVertical: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  modalButtonsMobile: {
    paddingHorizontal: 16,
  },
  modalButtonsDesktop: {
    paddingHorizontal: 24,
  },
  modalButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: '#333333', // Gris oscuro
  },
  confirmButton: {
    backgroundColor: '#00cc6a', // Verde Uber Eats
  },
  modalButtonText: {
    color: '#ffffff', // Texto blanco
    fontWeight: '600',
    fontSize: 16,
  },

  // Formulario de quejas
  quejaFormContainer: {
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 12,
    margin: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0', // Borde gris muy claro
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }
    }),
  },
  quejaFormContainerMobile: {
    padding: 16,
  },
  quejaFormContainerDesktop: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000000', // Texto negro
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff', // Fondo blanco
    color: '#000000', // Texto negro
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  // Textos varios
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#707070', // Gris medio
  },
  noPedidosText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#707070', // Gris medio
  },

  // Sidebar móvil
  mobileSidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#000000', // Fondo negro
    padding: 24,
    zIndex: 1000,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '2px 0 15px rgba(0,0,0,0.1)',
      }
    }),
  },
  mobileOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Overlay más oscuro
    zIndex: 99,
  },
  menuIcon: {
    fontSize: 24,
    color: '#000000', // Texto negro
    marginRight: 16,
  },
  mobileHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  // Botón flotante para sidebar
  floatingSidebarButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00cc6a', // Verde Uber Eats
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 204, 106, 0.3)', // Sombra verde
      }
    }),
    zIndex: 100,
  },
  floatingSidebarButtonText: {
    fontSize: 28,
    color: '#ffffff', // Texto blanco
    fontWeight: '600',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
  mobileLogo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  sidebarLogo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: '#ffffff', // Fondo negro para contenedor del logo en sidebar
  },
  mobileLogo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    fontSize: 24,
    color: '#ffffff', // Texto blanco para botones en sidebar negro
  },

  // Agrega estos estilos a tu archivo ClienteStyle.js
ratingContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 20,
},
star: {
  fontSize: 32,
  marginHorizontal: 5,
},
starFilled: {
  color: '#FFD700', // Amarillo oro para estrellas seleccionadas
},
starEmpty: {
  color: '#CCCCCC', // Gris para estrellas no seleccionadas
},
ratingText: {
  marginLeft: 15,
  fontSize: 16,
  color: '#333',
  fontWeight: 'bold',
},
calificacionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10,
  color: '#333',
},
});