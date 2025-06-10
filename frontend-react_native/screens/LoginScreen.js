import { useState } from 'react';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { usuarios } from '../data/data';
import { styles } from '../styles/globalStyles';
import { 
  ScrollView, 
  Alert, 
  ActivityIndicator, 
  View,  // Añade este import
  Text   // Añade este import si no está
} from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [cedula, setCedula] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!cedula.trim() || !contrasena.trim()) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const user = usuarios.find(u => u.cedula === cedula && u.contrasena === contrasena);

      if (!user) {
        Alert.alert('Error', 'Credenciales inválidas o usuario no registrado.');
        setLoading(false);
        return;
      }

      if (user.rol === 'cliente' && user.estado === 'suspendido') {
        Alert.alert('Acceso denegado', 'Tu cuenta de cliente está suspendida.');
        setLoading(false);
        return;
      }

      onLogin(user);
      setLoading(false);
    }, 1000);
  };

  return (
      <View style={{ flex: 1 }}> {/* Contenedor principal con flex: 1 */}
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>CletaEats - Iniciar Sesión</Text>
        
        <AuthInput 
          placeholder="Cédula / Cédula Jurídica"
          value={cedula}
          onChangeText={setCedula}
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
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
          />
        )}
      </ScrollView>
      </View>
  );
}