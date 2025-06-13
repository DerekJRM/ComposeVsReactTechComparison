import { useState } from 'react';
import { 
  ScrollView, 
  Alert, 
  ActivityIndicator, 
  View,
  Text,
  Platform
} from 'react-native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { styles } from '../styles/globalStyles';

// Configuración especial para Android con Expo GO
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://192.168.100.4:8080'; // Android Emulator
  }
  return 'http://localhost:8080'; // iOS simulator o web
};

const API_BASE_URL = getBaseUrl();

export default function LoginScreen({ onLogin }) {
  const [cedula, setCedula] = useState('1-1111-1111'); // Valor por defecto para pruebas
  const [contrasena, setContrasena] = useState('contrasena123'); // Valor por defecto para pruebas
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!cedula.trim() || !contrasena.trim()) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    
    try {
      // URL de prueba directa (puedes comentar esta línea)
      console.log('URL de prueba:', `${API_BASE_URL}/api/login/1-1111-1111/contrasena123`);
      
      const loginUrl = `${API_BASE_URL}/api/login/${encodeURIComponent(cedula)}/${encodeURIComponent(contrasena)}`;
      console.log('Conectando a:', loginUrl);

      const response = await fetch(loginUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        timeout: 10000, // 10 segundos de timeout
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          response.status === 401 ? 'Credenciales inválidas' : 
          response.status === 404 ? 'Usuario no encontrado' : 
          `Error del servidor (${response.status})`
        );
      }

      const userData = await response.json();
      console.log('Respuesta recibida:', userData);

      if (!userData.cedula) {
        throw new Error('Formato de respuesta inválido');
      }

      // Login exitoso
      onLogin(userData);
    } catch (error) {
      console.error('Error completo:', error);
      Alert.alert(
        'Error de conexión', 
        `No se pudo conectar al servidor backend.\n\nAsegúrate que:\n1. El servidor esté corriendo\n2. La IP sea correcta\n3. No haya problemas de firewall\n\nError técnico: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>CletaEats - Iniciar Sesión</Text>
        
        <AuthInput 
          placeholder="Cédula (ej: 1-1111-1111)"
          value={cedula}
          onChangeText={setCedula}
          keyboardType="default"
        />
        
        <AuthInput 
          placeholder="Contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />
        
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <AuthButton 
            title="Ingresar" 
            onPress={handleLogin} 
            disabled={loading}
          />
        )}

        {/* Mensaje de ayuda para desarrollo */}
        {__DEV__ && (
          <Text style={styles.debugText}>
            Modo desarrollo: {API_BASE_URL}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}