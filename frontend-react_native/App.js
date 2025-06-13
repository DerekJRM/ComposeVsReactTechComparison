import { useState } from 'react';
import { View, Text, Button } from 'react-native'; // Importa los componentes necesarios
import LoginScreen from './screens/LoginScreen';
import ClienteScreen from './screens/ClienteDashboard/ClienteScreen';
import RepartidorScreen from './screens/RepartidorDashboard/RepartidorScreen';
import RestauranteScreen from './screens/RestauranteDashboard/RestauranteScreen';

export default function App() {
  const [usuario, setUsuario] = useState(null);

  const handleLogin = (user) => {
    setUsuario(user);
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  if (usuario) {
    switch (usuario.rol) {
      case 'CLIENTE':
        return <ClienteScreen cliente={usuario} onLogout={handleLogout} />;
      case 'REPARTIDOR':
        return <RepartidorScreen repartidor={usuario} onLogout={handleLogout} />;
      case 'RESTAURANTE':
        return <RestauranteScreen restaurante={usuario} onLogout={handleLogout} />;
      default:
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Rol no reconocido</Text>
            <Button title="Cerrar sesión" onPress={handleLogout} />
          </View>
        );
    }
  }

  return <LoginScreen onLogin={handleLogin} />;
}