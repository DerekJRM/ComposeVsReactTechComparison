import { ScrollView, Text, View } from 'react-native';
import AuthButton from '../../components/AuthButton';
import { styles } from '../../styles/globalStyles';

export default function RestauranteScreen({ restaurante, onLogout }) {
  return (
    <ScrollView contentContainerStyle={styles.dashboardContainer}>
      <Text style={styles.bienvenida}>Restaurante: {restaurante.nombre}</Text>
      <Text style={styles.infoText}>Tipo de comida: {restaurante.tipoComida}</Text>
      <Text style={styles.subtitulo}>Combos disponibles:</Text>
      
      {restaurante.combos.map(combo => (
        <View key={combo.numero} style={styles.comboContainer}>
          <Text style={styles.comboTitle}>Combo #{combo.numero}</Text>
          <Text style={styles.comboDesc}>{combo.descripcion}</Text>
          <Text style={styles.comboPrice}>₡{combo.precio}</Text>
        </View>
      ))}
      
      <AuthButton 
        title="Cerrar sesión" 
        onPress={onLogout}
        style={styles.logoutButton}
        textStyle={styles.logoutButtonText}
      />
    </ScrollView>
  );
}