import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // Contenedores principales
  containerBase: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco
  },
  mobileContainer: {
    marginTop: 15,
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco
  },
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff', // Fondo blanco
  },

  // Sidebar móvil mejorado (en negro)
  mobileSidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#000000', // Fondo negro
    zIndex: 1000,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '4px 0 15px rgba(0,0,0,0.2)', // Sombra más oscura para contraste
      }
    }),
  },
  
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Overlay más oscuro
    zIndex: 999,
  },
  
  sidebarToggleButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    backgroundColor: '#00cc6a', // Verde Uber Eats
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 204, 106, 0.3)', // Sombra verde
      }
    }),
  },
  
  sidebarToggleButtonText: {
    color: '#ffffff', // Texto blanco
    fontSize: 28,
    fontWeight: '600',
  },

  // Header móvil mejorado
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff', // Fondo blanco
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Borde gris claro
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
    flex: 1,
  },
  
  mobileInfo: {
    fontSize: 14,
    color: '#707070', // Gris medio
    marginTop: 6,
  },

  // Contenido móvil mejorado
  mobileContent: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco
    padding: 16,

  },

  // Sidebar común (mobile y desktop) - en negro
  sidebar: {
    width: 280,
    backgroundColor: '#000000', // Fondo negro
    padding: 24,
    justifyContent: 'flex-start',
    ...Platform.select({
      web: {
        boxShadow: '2px 0 10px rgba(0,0,0,0.2)', // Sombra más oscura
      }
    }),
  },
  
  profileSection: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Borde gris oscuro
    paddingBottom: 24,
  },
  
  welcomeText: {
    color: '#a0a0a0', // Gris claro
    fontSize: 16,
    marginBottom: 8,
  },
  
  userName: {
    color: '#ffffff', // Texto blanco
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  
  userInfo: {
    color: '#a0a0a0', // Gris claro
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  
  sidebarButton: {
    backgroundColor: '#00cc6a', // Verde Uber Eats
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  sidebarButtonText: {
    color: '#ffffff', // Texto blanco
    fontWeight: '600',
    fontSize: 16,
  },
  
  activeTab: {
    backgroundColor: '#00a859', // Verde más oscuro para estado activo
  },
  
  activeTabText: {
    color: '#ffffff', // Texto blanco
  },
  
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: '#333333', // Gris oscuro
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  logoutButtonText: {
    color: '#ffffff', // Texto blanco
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },

  // Contenido desktop
  desktopContent: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff', // Fondo blanco
  },

  // Sección de títulos
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000', // Texto negro
    marginBottom: 20,
    marginLeft: 12,
  },

  // Listas
  mobileListContainer: {
    paddingBottom: 24,
  },
  desktopListContainer: {
    padding: 12,
  },
  desktopColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // Tarjetas de pedidos mejoradas
  pedidoCard: {
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#f0f0f0', // Borde gris claro
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
    marginBottom: 16,
  },
  pedidoCardDesktop: {
    width: '48%',
    marginBottom: 16,
  },
  pedidoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000', // Texto negro
    marginBottom: 8,
  },
  pedidoInfo: {
    fontSize: 14,
    color: '#707070', // Gris medio
    marginBottom: 6,
    lineHeight: 20,
  },
  pedidoEstado: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  estadoEnPreparacion: {
    color: '#ff9500', // Naranja
  },
  estadoEnCamino: {
    color: '#00a0e9', // Azul claro
  },
  estadoEntregado: {
    color: '#00cc6a', // Verde Uber Eats
  },
  estadoCancelado: {
    color: '#ff3b30', // Rojo
  },
  estadoOtro: {
    color: '#a0a0a0', // Gris claro
  },

  // Texto vacío
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#a0a0a0', // Gris claro
    lineHeight: 24,
  },

  // Modales mejorados
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
    borderBottomColor: '#f0f0f0', // Borde gris claro
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
  modalContent: {
    padding: 16,
  },

  // Secciones de detalle
  detailSection: {
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0', // Borde gris claro
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
    }),
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000', // Texto negro
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Borde gris claro
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 15,
    color: '#707070', // Gris medio
    flex: 1,
  },
  detailValue: {
    fontSize: 15,
    color: '#000000', // Texto negro
    flex: 2,
    textAlign: 'right',
    fontWeight: '500',
  },
  comboDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Borde gris claro
  },
  comboDetailName: {
    fontSize: 14,
    color: '#000000', // Texto negro
    flex: 3,
  },
  comboDetailPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00cc6a', // Verde Uber Eats
    flex: 1,
    textAlign: 'right',
  },

  // Resumen de compra
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0', // Borde gris claro
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

  // Inputs y formularios
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
    borderColor: '#f0f0f0', // Borde gris claro
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

  // Contenedor de botones
  buttonsContainer: {
    marginTop: 16,
  },

  // Botones de acción
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
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
  enCaminoButton: {
    backgroundColor: '#00a0e9', // Azul claro
  },
  entregadoButton: {
    backgroundColor: '#00cc6a', // Verde Uber Eats
  },
  actionButtonText: {
    color: '#ffffff', // Texto blanco
    fontWeight: '600',
    fontSize: 16,
  },

  // Tarjetas de quejas
  quejaCard: {
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0', // Borde gris claro
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
    fontWeight: '600',
    color: '#000000', // Texto negro
    marginBottom: 8,
  },
  quejaInfo: {
    fontSize: 14,
    color: '#707070', // Gris medio
    marginBottom: 6,
  },
  quejaDescripcion: {
    fontSize: 14,
    color: '#000000', // Texto negro
    marginTop: 12,
    fontStyle: 'italic',
    lineHeight: 22,
  },

  // Pestañas
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    flexWrap: 'wrap',
  },
  tabButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#00cc6a', // Verde Uber Eats
    marginBottom: 8,
    minWidth: '30%',
    alignItems: 'center',
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
  tabButtonText: {
    color: '#ffffff', // Texto blanco
    fontWeight: '600',
    fontSize: 14,
  },
  activeTab: {
    backgroundColor: '#000000', // Negro para pestaña activa
  },
  aceptarButton: {
    backgroundColor: '#00cc6a', // Verde Uber Eats
    marginBottom: 8,
  },
  rechazarButton: {
    backgroundColor: '#ff3b30', // Rojo
  },

  // Estilos para logo
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: '#ffffff', // Fondo negro para contenedor del logo
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

  sidebarLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
});