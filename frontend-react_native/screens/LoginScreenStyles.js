import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Paleta de colores completa con variantes
const COLORS = {
  primary: '#06C167',       // Verde UberEats
  primaryLight: '#E8F7EE',  // Verde claro
  primaryDark: '#05A357',   // Verde oscuro
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F8F8F8',     // Gris muy claro
  gray: '#E0E0E0',         // Gris medio
  darkGray: '#757575',      // Gris oscuro
  text: '#2D2D2D',         // Texto principal
  textSecondary: '#5E5E5E', // Texto secundario
  background: '#F9F9F9',    // Fondo general
  error: '#EF5350',         // Rojo para errores (actualizado)
  errorLight: '#FFEBEE',    // Rojo claro
  errorDark: '#C62828',     // Rojo oscuro
  cancel: '#F1F1F1',       // Color base para cancelar
  overlay: 'rgba(0,0,0,0.6)', // Overlay para modales
};

export default StyleSheet.create({
  // Contenedores principales
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  
  // Tarjetas y superficies
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: width < 768 ? 24 : 32,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  
  // Tipografía
  titulo: {
    fontSize: width < 768 ? 26 : 30,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: -0.3,
  },
  
  // Formularios y entradas
  inputContainer: {
    marginBottom: width < 768 ? 20 : 24,
  },
  inputField: {
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  inputFieldFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  
  // Botones principales
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Botón cancelar estándar
  cancelButton: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Botón cancelar rojo (MEJORADO)
  cancelRedButton: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: COLORS.error,
  },
  cancelRedButtonText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelRedButtonPressed: {
    backgroundColor: COLORS.errorLight,
    borderColor: COLORS.errorDark,
  },
  
  // Estados y carga
  loadingContainer: {
    marginVertical: width < 768 ? 20 : 28,
    alignItems: 'center',
  },
  
  // Enlaces y texto secundario
  footerText: {
    marginTop: 24,
    color: COLORS.darkGray,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  signUpLink: {
    color: COLORS.primary,
    fontWeight: '600',
    textDecorationLine: 'none',
  },
  
  // Modales
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.overlay,
    padding: 24,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 28,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: COLORS.text,
  },
  
  // Selectores de rol
  roleButton: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
  },
  roleButtonActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  roleButtonText: {
    textAlign: 'center',
    color: COLORS.text,
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  
  // Mensajes de error
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    marginTop: 6,
    marginLeft: 8,
    fontWeight: '500',
  },
  roleFieldsContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 16,
  },

  // Inputs mejorados para el formulario
  formInput: {
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  formInputFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },

  // Inputs específicos para campos numéricos
  numericInput: {
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.primaryLight,
  },

  // Label para grupos de inputs
  inputGroupLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginBottom: 8,
    marginLeft: 4,
  },

  // Contenedor para inputs en línea (como los de km)
  inlineInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineInput: {
    width: '48%', // Para dos inputs en una línea
  },

  // Botones específicos del formulario
  formButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  formButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },

  // Botón de cancelar específico
  formCancelButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.error,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCancelButtonText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: '600',
  },
  formCancelButtonPressed: {
    backgroundColor: COLORS.errorLight,
  },

  // Mensaje informativo para campos
  fieldInfoText: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 4,
    fontStyle: 'italic',
  },

  // Selector de tipo de comida (si es necesario)
  foodTypeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  foodTypeOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginRight: 8,
    marginBottom: 8,
  },
  foodTypeOptionSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  foodTypeOptionText: {
    color: COLORS.text,
  },
  foodTypeOptionTextSelected: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
});