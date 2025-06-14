import { useState } from 'react';
import { 
  ScrollView, 
  Alert, 
  ActivityIndicator, 
  View,
  Text,
  Platform,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';

// Configuración de la URL base
const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === 'android' 
      ? 'http://192.168.100.4:8080/api' 
      : 'http://localhost:8080/api';
  }
  return 'http://localhost:8080/api'; // Reemplazar en producción
};

const API_BASE_URL = getBaseUrl();
const { width } = Dimensions.get('window');

// Estilos
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: width < 768 ? 24 : 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  titulo: {
    fontSize: width < 768 ? 24 : 28,
    fontWeight: '700',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'Arial'
    }),
  },
  inputContainer: {
    marginBottom: width < 768 ? 16 : 20,
  },
  debugText: {
    marginTop: 24,
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
    backgroundColor: '#f1f2f6',
    padding: 8,
    borderRadius: 8,
  },
  loadingContainer: {
    marginVertical: width < 768 ? 16 : 24,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 24,
    color: '#636e72',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default function LoginScreen({ onLogin }) {
  const [cedula, setCedula] = useState('4-4444-4444');
  const [contrasena, setContrasena] = useState('reparto123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validación básica
    if (!cedula.trim() || !contrasena.trim()) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    
    try {
      // Construye la URL con el prefijo api/ incluido en la base
      const loginUrl = `${API_BASE_URL}/login/${encodeURIComponent(cedula.trim())}/${encodeURIComponent(contrasena.trim())}`;
      console.log('Conectando a:', loginUrl);

      const response = await fetch(loginUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        timeout: 10000,
      });

      // Manejo de errores HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.mensaje || 
          (response.status === 401 ? 'Credenciales inválidas' : 
           response.status === 404 ? 'Usuario no encontrado' : 
           `Error del servidor (${response.status})`);
        
        throw new Error(errorMessage);
      }

      const userData = await response.json();
      
      // Validación de respuesta
      if (!userData.cedula) {
        throw new Error('Formato de respuesta inválido del servidor');
      }

      // Login exitoso
      onLogin(userData);
      
    } catch (error) {
      console.error('Error en login:', error);
      Alert.alert(
        'Error de autenticación', 
        error.message || 'No se pudo conectar al servidor. Verifique:\n1. El servidor esté activo\n2. La conexión de red\n3. Las credenciales'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.outerContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.titulo}>CletaEats</Text>
            
            <View style={styles.inputContainer}>
              <AuthInput 
                placeholder="Cédula (ej: 1-1111-1111)"
                value={cedula}
                onChangeText={setCedula}
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <AuthInput 
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.loadingContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="#0984e3" />
              ) : (
                <AuthButton 
                  title="Ingresar" 
                  onPress={handleLogin} 
                  disabled={loading}
                />
              )}
            </View>

            <Text style={styles.footerText}>
              ¿Primera vez aquí? Contacta al administrador
            </Text>

            {__DEV__ && (
              <Text style={styles.debugText}>
                Endpoint: {API_BASE_URL}/login/cedula/contrasena
              </Text>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}