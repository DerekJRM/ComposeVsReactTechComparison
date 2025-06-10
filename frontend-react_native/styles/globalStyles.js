import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  dashboardContainer: {
    flexGrow: 1,
    backgroundColor: '#f3f3f3',
    padding: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333'
  },
  bienvenida: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#444'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555'
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16
  },
  buttonBase: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonTextBase: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginButton: {
    backgroundColor: '#4CAF50',
  },
  loginButtonText: {
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    marginTop: 30,
    marginBottom: 20
  },
  logoutButtonText: {
    color: '#fff',
  },
  comboContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  comboTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  comboDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  comboPrice: {
    fontWeight: 'bold',
    color: '#2E7D32'
  }
});