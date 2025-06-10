export const usuarios = [
  // CLIENTES
  {
    rol: 'cliente',
    cedula: '10101010',
    nombre: 'Ana Gómez',
    direccion: 'Heredia Centro',
    correo: 'ana@gmail.com',
    celular: '88888888',
    tarjeta: '1111222233334444',
    estado: 'activo',
    contrasena: 'ana123'
  },
  {
    rol: 'cliente',
    cedula: '20202020',
    nombre: 'Luis Pérez',
    direccion: 'Barva',
    correo: 'luis@gmail.com',
    celular: '89999999',
    tarjeta: '5555666677778888',
    estado: 'suspendido',
    contrasena: 'luis456'
  },

  // REPARTIDORES
  {
    rol: 'repartidor',
    cedula: '30303030',
    nombre: 'Carlos Ruiz',
    correo: 'carlos@correo.com',
    direccion: 'San Joaquín',
    celular: '87777777',
    tarjeta: '9999888877776666',
    estado: 'disponible',
    distanciaPedido: 0,
    kmDiarios: 0,
    costoPorKm: { habil: 1000, feriado: 1500 },
    amonestaciones: 1,
    quejas: [],
    contrasena: 'carlos123'
  },

  // RESTAURANTES
  {
    rol: 'restaurante',
    cedula: 'J-40404040',
    nombre: 'Sabor Tico',
    direccion: 'San Francisco',
    tipoComida: 'típica',
    combos: [
      { numero: 1, descripcion: 'Casado con pollo', precio: 4000 },
      { numero: 2, descripcion: 'Casado con carne', precio: 5000 }
    ],
    correo: 'sabor@correo.com',
    contrasena: 'rest123'
  }
];