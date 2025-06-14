import { useState } from 'react';
import { 
  ScrollView, 
  Alert, 
  ActivityIndicator, 
  View,
  Text,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet
} from 'react-native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';

// Definimos los estilos directamente en el componente
const styles = StyleSheet.create({
  // Estilos base (mantenidos de la versión original)
  outerContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: -0.3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  loadingContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 24,
    color: '#757575',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  signUpLink: {
    color: '#06C167',
    fontWeight: '600',
    textDecorationLine: 'none',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 28,
    shadowColor: '#000000',
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
    color: '#212121',
  },
  roleButton: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  roleButtonActive: {
    backgroundColor: '#E0F5EA',
    borderColor: '#06C167',
  },
  roleButtonText: {
    textAlign: 'center',
    color: '#212121',
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: '#049E4F',
    fontWeight: '600',
  },

  /* ESTILOS MEJORADOS PARA EL FORMULARIO */
  
  // Inputs mejorados
  formInput: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  formInputFocused: {
    borderColor: '#06C167',
    shadowColor: '#06C167',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  numericInput: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0F5EA',
  },

  // Contenedor para campos específicos
  roleFieldsContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 16,
  },
  inputGroupLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#049E4F',
    marginBottom: 8,
    marginLeft: 4,
  },
  inlineInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineInput: {
    width: '48%',
  },
  fieldInfoText: {
    fontSize: 12,
    color: '#757575',
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 4,
    fontStyle: 'italic',
  },

  // Botones mejorados
  formButton: {
    backgroundColor: '#06C167',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#049E4F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  formButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  formCancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EF5350',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  formCancelButtonText: {
    color: '#EF5350',
    fontSize: 16,
    fontWeight: '600',
  },
  formCancelButtonPressed: {
    backgroundColor: '#FFEBEE',
  },
});

const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === 'android' 
      ? 'http://192.168.100.4:8080/api' 
      : 'http://localhost:8080/api';
  }
  return 'http://localhost:8080/api';
};

const API_BASE_URL = getBaseUrl();

export default function LoginScreen({ onLogin }) {
  const [cedula, setCedula] = useState('3101123456');
  const [contrasena, setContrasena] = useState('ticoRico123');
  const [loading, setLoading] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('CLIENTE');
  
  // Common fields
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  
  // Client specific
  const [numTarjeta, setNumTarjeta] = useState('');
  
  // Restaurant specific
  const [cedulaJuridica, setCedulaJuridica] = useState('');
  const [tipoComida, setTipoComida] = useState('');
  
  // Driver specific
  const [kmHabil, setKmHabil] = useState('1000');
  const [kmFeriado, setKmFeriado] = useState('1500');

  const handleLogin = async () => {
    if (!cedula.trim() || !contrasena.trim()) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    
    try {
      const loginUrl = `${API_BASE_URL}/login/${encodeURIComponent(cedula.trim())}/${encodeURIComponent(contrasena.trim())}`;
      const response = await fetch(loginUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.mensaje || 
          (response.status === 401 ? 'Credenciales inválidas' : 
           response.status === 404 ? 'Usuario no encontrado' : 
           `Error del servidor (${response.status})`);
        throw new Error(errorMessage);
      }

      const userData = await response.json();
      if (!userData.cedula) throw new Error('Formato de respuesta inválido');
      onLogin(userData);
      
    } catch (error) {
      Alert.alert('Error de autenticación', error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!cedula.trim() || !contrasena.trim() || !nombre.trim() || !email.trim()) {
      Alert.alert('Error', 'Por favor complete los campos requeridos');
      return;
    }

    if (selectedRole === 'RESTAURANTE' && !cedulaJuridica.trim()) {
      Alert.alert('Error', 'Por favor ingrese la cédula jurídica');
      return;
    }

    setLoading(true);
    
    try {
      const userResponse = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          cedula: cedula.trim(),
          contrasena: contrasena.trim(),
          rol: selectedRole
        }),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json().catch(() => ({}));
        throw new Error(errorData.mensaje || 'Error al crear usuario');
      }

      let entityUrl, entityData;
      
      switch(selectedRole) {
        case 'CLIENTE':
          entityUrl = `${API_BASE_URL}/clientes`;
          entityData = {
            cedula: cedula.trim(),
            nombre: nombre.trim(),
            direccion: direccion.trim(),
            telefono: telefono.trim(),
            email: email.trim(),
            numTarjeta: numTarjeta.trim(),
            estado: 'ACTIVO'
          };
          break;
          
        case 'REPARTIDOR':
          entityUrl = `${API_BASE_URL}/repartidores`;
          entityData = {
            cedula: cedula.trim(),
            nombre: nombre.trim(),
            email: email.trim(),
            direccion: direccion.trim(),
            telefono: telefono.trim(),
            numTarjeta: numTarjeta.trim(),
            estado: 'DISPONIBLE',
            costoKmHabil: parseFloat(kmHabil) || 1000,
            costoKmFeriado: parseFloat(kmFeriado) || 1500
          };
          break;
          
        case 'RESTAURANTE':
          entityUrl = `${API_BASE_URL}/restaurantes`;
          entityData = {
            cedulaJuridica: cedulaJuridica.trim(),
            nombre: nombre.trim(),
            direccion: direccion.trim(),
            tipoComida: tipoComida.trim()
          };
          break;
      }

      const entityResponse = await fetch(entityUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(entityData),
      });

      if (!entityResponse.ok) {
        throw new Error('Error al crear el registro específico');
      }

      Alert.alert(
        'Registro exitoso', 
        `Su cuenta de ${selectedRole.toLowerCase()} ha sido creada correctamente`,
        [{ text: 'OK', onPress: () => {
          setShowSignUpModal(false);
          resetSignUpForm();
        }}]
      );
      
    } catch (error) {
      Alert.alert('Error en registro', error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const resetSignUpForm = () => {
    setNombre('');
    setEmail('');
    setDireccion('');
    setTelefono('');
    setNumTarjeta('');
    setCedulaJuridica('');
    setTipoComida('');
    setKmHabil('1000');
    setKmFeriado('1500');
    setSelectedRole('CLIENTE');
  };

  const renderRoleSpecificFields = () => {
    switch(selectedRole) {
      case 'CLIENTE':
        return (
          <View style={styles.roleFieldsContainer}>
            <Text style={styles.inputGroupLabel}>Información de pago</Text>
            <AuthInput
              placeholder="Número de tarjeta"
              value={numTarjeta}
              onChangeText={setNumTarjeta}
              keyboardType="numeric"
              style={[styles.formInput, styles.numericInput]}
            />
          </View>
        );
      case 'REPARTIDOR':
        return (
          <View style={styles.roleFieldsContainer}>
            <Text style={styles.inputGroupLabel}>Información de pago</Text>
            <AuthInput
              placeholder="Número de tarjeta"
              value={numTarjeta}
              onChangeText={setNumTarjeta}
              keyboardType="numeric"
              style={[styles.formInput, styles.numericInput]}
            />
            
            <Text style={styles.inputGroupLabel}>Tarifas de envío</Text>
            <View style={styles.inlineInputContainer}>
              <AuthInput
                placeholder="Km día hábil"
                value={kmHabil}
                onChangeText={setKmHabil}
                keyboardType="numeric"
                style={[styles.formInput, styles.inlineInput, styles.numericInput]}
              />
              <AuthInput
                placeholder="Km feriado"
                value={kmFeriado}
                onChangeText={setKmFeriado}
                keyboardType="numeric"
                style={[styles.formInput, styles.inlineInput, styles.numericInput]}
              />
            </View>
            <Text style={styles.fieldInfoText}>Estos valores pueden ser ajustados luego</Text>
          </View>
        );
      case 'RESTAURANTE':
        return (
          <View style={styles.roleFieldsContainer}>
            <Text style={styles.inputGroupLabel}>Información del restaurante</Text>
            <AuthInput
              placeholder="Cédula jurídica"
              value={cedulaJuridica}
              onChangeText={setCedulaJuridica}
              style={styles.formInput}
            />
            <AuthInput
              placeholder="Tipo de comida"
              value={tipoComida}
              onChangeText={setTipoComida}
              style={styles.formInput}
            />
          </View>
        );
      default:
        return null;
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
                maxLength={12}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <AuthInput 
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
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
              ¿Primera vez aquí?{' '}
              <Text 
                style={styles.signUpLink} 
                onPress={() => setShowSignUpModal(true)}
              >
                Regístrate aquí
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* Sign Up Modal */}
      <Modal
        visible={showSignUpModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowSignUpModal(false);
          resetSignUpForm();
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Registro de nueva cuenta</Text>
            
            {/* Role Selection */}
            <Pressable 
              style={[
                styles.roleButton, 
                selectedRole === 'CLIENTE' && styles.roleButtonActive
              ]}
              onPress={() => setSelectedRole('CLIENTE')}
            >
              <Text style={[
                styles.roleButtonText,
                selectedRole === 'CLIENTE' && styles.roleButtonTextActive
              ]}>
                Cliente
              </Text>
            </Pressable>
            
            <Pressable 
              style={[
                styles.roleButton, 
                selectedRole === 'REPARTIDOR' && styles.roleButtonActive
              ]}
              onPress={() => setSelectedRole('REPARTIDOR')}
            >
              <Text style={[
                styles.roleButtonText,
                selectedRole === 'REPARTIDOR' && styles.roleButtonTextActive
              ]}>
                Repartidor
              </Text>
            </Pressable>
            
            <Pressable 
              style={[
                styles.roleButton, 
                selectedRole === 'RESTAURANTE' && styles.roleButtonActive
              ]}
              onPress={() => setSelectedRole('RESTAURANTE')}
            >
              <Text style={[
                styles.roleButtonText,
                selectedRole === 'RESTAURANTE' && styles.roleButtonTextActive
              ]}>
                Restaurante
              </Text>
            </Pressable>

            {/* Common Fields */}
            <AuthInput
              placeholder="Cédula"
              value={cedula}
              onChangeText={setCedula}
              keyboardType="default"
              maxLength={12}
              style={styles.formInput}
            />
            <AuthInput
              placeholder="Contraseña"
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry
              style={styles.formInput}
            />
            <AuthInput
              placeholder="Nombre completo"
              value={nombre}
              onChangeText={setNombre}
              style={styles.formInput}
            />
            <AuthInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.formInput}
            />
            <AuthInput
              placeholder="Dirección"
              value={direccion}
              onChangeText={setDireccion}
              style={styles.formInput}
            />
            <AuthInput
              placeholder="Teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
              style={styles.formInput}
            />

            {/* Role Specific Fields */}
            {renderRoleSpecificFields()}

            {/* Action Buttons */}
            <View style={{ marginTop: 20 }}>
              {loading ? (
                <ActivityIndicator size="large" color="#0984e3" />
              ) : (
                <>
                  <Pressable 
                    style={({ pressed }) => [
                      styles.formButton,
                      pressed && { opacity: 0.9 }
                    ]}
                    onPress={handleSignUp}
                  >
                    <Text style={styles.formButtonText}>Registrarse</Text>
                  </Pressable>
                  
                  <Pressable 
                    style={({ pressed }) => [
                      styles.formCancelButton,
                      pressed && styles.formCancelButtonPressed
                    ]}
                    onPress={() => {
                      setShowSignUpModal(false);
                      resetSignUpForm();
                    }}
                  >
                    <Text style={styles.formCancelButtonText}>Cancelar</Text>
                  </Pressable>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}