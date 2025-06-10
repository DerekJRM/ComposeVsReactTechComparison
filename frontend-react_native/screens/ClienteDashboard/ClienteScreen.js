import { ScrollView, Text, TouchableOpacity } from 'react-native';
import AuthButton from '../../components/AuthButton';
import { styles } from '../../styles/globalStyles';

export default function ClienteScreen({ cliente, onLogout }) {
  return (
    <ScrollView contentContainerStyle={styles.dashboardContainer}>
      <Text style={styles.bienvenida}>Hola {cliente.nombre}, escoge tu restaurante</Text>
      <Text style={styles.infoText}>Estado: {cliente.estado}</Text>
      
      {/* Aquí iría la lista de restaurantes */}
      
      <AuthButton 
        title="Cerrar sesión" 
        onPress={onLogout}
        style={styles.logoutButton}
        textStyle={styles.logoutButtonText}
      />
    </ScrollView>
  );
}