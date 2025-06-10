import { ScrollView, Text } from 'react-native';
import AuthButton from '../../components/AuthButton';
import { styles } from '../../styles/globalStyles';

export default function RepartidorScreen({ repartidor, onLogout }) {
  return (
    <ScrollView contentContainerStyle={styles.dashboardContainer}>
      <Text style={styles.bienvenida}>Repartidor: {repartidor.nombre}</Text>
      <Text style={styles.infoText}>Amonestaciones: {repartidor.amonestaciones}</Text>
      <Text style={styles.infoText}>Estado: {repartidor.estado}</Text>
      
      {/* Aquí iría el contenido específico de repartidores */}
      
      <AuthButton 
        title="Cerrar sesión" 
        onPress={onLogout}
        style={styles.logoutButton}
        textStyle={styles.logoutButtonText}
      />
    </ScrollView>
  );
}