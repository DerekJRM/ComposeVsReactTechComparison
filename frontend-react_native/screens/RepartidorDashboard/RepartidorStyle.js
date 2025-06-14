import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // Contenedores principales
  containerBase: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mobileContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },

  // Sidebar móvil mejorado
  mobileSidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#ffffff',
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
        boxShadow: '4px 0 15px rgba(0,0,0,0.08)',
      }
    }),
  },
  
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 999,
  },
  
  sidebarToggleButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    backgroundColor: '#4CAF50',
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
        boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
      }
    }),
  },
  
  sidebarToggleButtonText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '600',
  },

  // Header móvil mejorado
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
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
    color: '#343a40',
    flex: 1,
  },
  
  mobileInfo: {
    fontSize: 14,
    color: '#868e96',
    marginTop: 6,
  },

  // Contenido móvil mejorado
  mobileContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },

  // Sidebar común (mobile y desktop)
  sidebar: {
    width: 280,
    backgroundColor: '#2c3e50',
    padding: 24,
    justifyContent: 'flex-start',
    ...Platform.select({
      web: {
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      }
    }),
  },
  
  profileSection: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
    paddingBottom: 24,
  },
  
  welcomeText: {
    color: '#e9ecef',
    fontSize: 16,
    marginBottom: 8,
  },
  
  userName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  
  userInfo: {
    color: '#adb5bd',
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  
  sidebarButton: {
    backgroundColor: '#4dabf7',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#4dabf7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  sidebarButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  
  activeTabText: {
    color: '#ffffff',
  },
  
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: '#ff6b6b',
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#ff6b6b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  logoutButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },

  // Contenido desktop
  desktopContent: {
    flex: 1,
    padding: 24,
  },

  // Sección de títulos
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#343a40',
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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
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
    color: '#343a40',
    marginBottom: 8,
  },
  pedidoInfo: {
    fontSize: 14,
    color: '#868e96',
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
    color: '#fd7e14',
  },
  estadoEnCamino: {
    color: '#4dabf7',
  },
  estadoEntregado: {
    color: '#40c057',
  },
  estadoCancelado: {
    color: '#ff6b6b',
  },
  estadoOtro: {
    color: '#868e96',
  },

  // Texto vacío
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#868e96',
    lineHeight: 24,
  },

  // Modales mejorados
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  backButton: {
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#4dabf7',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#343a40',
  },
  modalContent: {
    padding: 16,
  },

  // Secciones de detalle
  detailSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
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
    color: '#343a40',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
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
    color: '#868e96',
    flex: 1,
  },
  detailValue: {
    fontSize: 15,
    color: '#343a40',
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
    borderBottomColor: '#f1f3f5',
  },
  comboDetailName: {
    fontSize: 14,
    color: '#343a40',
    flex: 3,
  },
  comboDetailPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#40c057',
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
    borderTopColor: '#e9ecef',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#495057',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: 18,
    color: '#343a40',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#40c057',
  },

  // Inputs y formularios
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#343a40',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#4dabf7',
  },
  entregadoButton: {
    backgroundColor: '#40c057',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },

  // Tarjetas de quejas
  quejaCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
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
    color: '#343a40',
    marginBottom: 8,
  },
  quejaInfo: {
    fontSize: 14,
    color: '#868e96',
    marginBottom: 6,
  },
  quejaDescripcion: {
    fontSize: 14,
    color: '#495057',
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
    backgroundColor: '#4dabf7',
    marginBottom: 8,
    minWidth: '30%',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#4dabf7',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tabButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  activeTab: {
    backgroundColor: '#343a40',
  },
  aceptarButton: {
    backgroundColor: '#40c057',
    marginBottom: 8,
  },
  rechazarButton: {
    backgroundColor: '#ff6b6b',
  },
  // Agrega estos estilos a tu archivo RepartidorStyle.js

logoContainer: {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 20,
  marginTop: 20,
  backgroundColor: '#fff',
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
},

sidebarLogo: {
  width: 120,
  height: 120,
  resizeMode: 'contain',
  alignSelf: 'center',
  marginBottom: 10,
},
});