-- Insertar CLIENTES
INSERT INTO PROYECTO_MOVILES.clientes VALUES 
('1-1111-1111', 'Carlos Ramírez', 'San José, Rohrmoser', '8888-1111', 'carlos.ramirez@gmail.com', '5454545454545454', 'ACTIVO');
INSERT INTO PROYECTO_MOVILES.clientes VALUES 
('2-2222-2222', 'María Rodríguez', 'Alajuela, Desamparados', '8888-2222', 'maria.rodriguez@hotmail.com', '4111111111111111', 'ACTIVO');
INSERT INTO PROYECTO_MOVILES.clientes VALUES 
('3-3333-3333', 'José Vargas', 'Heredia, San Francisco', '8888-3333', 'jvargas@outlook.com', '6011000990139424', 'ACTIVO');

-- Insertar RESTAURANTES
INSERT INTO PROYECTO_MOVILES.restaurantes VALUES 
('3101123456', 'Soda TicoRico', 'Cartago, Paraíso centro', 'Comida típica');
INSERT INTO PROYECTO_MOVILES.restaurantes VALUES 
('3101987654', 'La Pasta Feliz', 'Heredia, Barva', 'Italiana');
INSERT INTO PROYECTO_MOVILES.restaurantes VALUES 
('3101765432', 'Burger Zona 506', 'San José, Escazú', 'Hamburguesas');

-- Insertar REPARTIDORES
INSERT INTO PROYECTO_MOVILES.repartidores VALUES 
('4-4444-4444', 'Luis Álvarez', 'luis.alvarez@ejemplo.com', 'San José, Hatillo', '8888-4444', '4000123412341234', 'DISPONIBLE', 2.5, 12.5, 1000, 1500, 1);
INSERT INTO PROYECTO_MOVILES.repartidores VALUES 
('5-5555-5555', 'Andrea Solano', 'andrea.solano@ejemplo.com', 'Heredia, San Rafael', '8888-5555', '4000654365436543', 'DISPONIBLE', 3.2, 10.1, 1000, 1500, 0);
INSERT INTO PROYECTO_MOVILES.repartidores VALUES 
('6-6666-6666', 'Pedro Navarro', 'pedro.navarro@ejemplo.com', 'Cartago, Occidental', '8888-6666', '4000765432567890', 'OCUPADO', 1.8, 8.7, 1000, 1500, 2);

-- Insertar COMBOS
INSERT INTO PROYECTO_MOVILES.combos (restaurante_id, combo_num, precio) VALUES ('3101123456', 1, 3500);
INSERT INTO PROYECTO_MOVILES.combos (restaurante_id, combo_num, precio) VALUES ('3101123456', 2, 4500);
INSERT INTO PROYECTO_MOVILES.combos (restaurante_id, combo_num, precio) VALUES ('3101123456', 3, 5200);
INSERT INTO PROYECTO_MOVILES.combos (restaurante_id, combo_num, precio) VALUES ('3101987654', 1, 6000);
INSERT INTO PROYECTO_MOVILES.combos (restaurante_id, combo_num, precio) VALUES ('3101987654', 2, 7200);
INSERT INTO PROYECTO_MOVILES.combos (restaurante_id, combo_num, precio) VALUES ('3101765432', 1, 4800);
INSERT INTO PROYECTO_MOVILES.combos (restaurante_id, combo_num, precio) VALUES ('3101765432', 2, 5600);
INSERT INTO PROYECTO_MOVILES.combos (restaurante_id, combo_num, precio) VALUES ('3101765432', 3, 5900);
INSERT INTO PROYECTO_MOVILES.combos (restaurante_id, combo_num, precio) VALUES ('3101765432', 4, 6100);

-- Insertar PEDIDOS
INSERT INTO PROYECTO_MOVILES.pedidos (cliente_id, restaurante_id, repartidor_id, estado, fecha_pedido, fecha_entrega, subtotal, costo_transporte) 
VALUES ('1-1111-1111', '3101123456', '4-4444-4444', 'ENTREGADO', SYSTIMESTAMP - INTERVAL '2' DAY, SYSTIMESTAMP - INTERVAL '1' DAY, 9700, 1500);

INSERT INTO PROYECTO_MOVILES.pedidos (cliente_id, restaurante_id, repartidor_id, estado, fecha_pedido, fecha_entrega, subtotal, costo_transporte) 
VALUES ('2-2222-2222', '3101987654', '5-5555-5555', 'EN_CAMINO', SYSTIMESTAMP - INTERVAL '1' HOUR, NULL, 7200, 1200);

INSERT INTO PROYECTO_MOVILES.pedidos (cliente_id, restaurante_id, repartidor_id, estado, fecha_pedido, fecha_entrega, subtotal, costo_transporte) 
VALUES ('3-3333-3333', '3101765432', '6-6666-6666', 'EN_PREPARACION', SYSTIMESTAMP, NULL, 6100, 1300);

-- Insertar DETALLE DE PEDIDOS
INSERT INTO PROYECTO_MOVILES.pedido_combos (pedido_id, combo_id, cantidad, precio_unit) VALUES (1, 1, 1, 3500);
INSERT INTO PROYECTO_MOVILES.pedido_combos (pedido_id, combo_id, cantidad, precio_unit) VALUES (1, 2, 1, 4500);
INSERT INTO PROYECTO_MOVILES.pedido_combos (pedido_id, combo_id, cantidad, precio_unit) VALUES (1, 3, 1, 5200);
INSERT INTO PROYECTO_MOVILES.pedido_combos (pedido_id, combo_id, cantidad, precio_unit) VALUES (2, 4, 1, 6000);
INSERT INTO PROYECTO_MOVILES.pedido_combos (pedido_id, combo_id, cantidad, precio_unit) VALUES (3, 8, 1, 6100);

-- Insertar QUEJAS
INSERT INTO PROYECTO_MOVILES.quejas (repartidor_id, cliente_id, descripcion) VALUES ('6-6666-6666', '3-3333-3333', 'El pedido llegó con 30 minutos de retraso y la comida estaba fría.');
INSERT INTO PROYECTO_MOVILES.quejas (repartidor_id, cliente_id, descripcion) VALUES ('4-4444-4444', '1-1111-1111', 'El repartidor no quiso subir al segundo piso para entregar.');

-- Insertar USUARIOS (CLIENTES)
INSERT INTO PROYECTO_MOVILES.usuarios VALUES ('1-1111-1111', 'CLIENTE', 'contrasena123');
INSERT INTO PROYECTO_MOVILES.usuarios VALUES ('2-2222-2222', 'CLIENTE', 'claveSegura456');
INSERT INTO PROYECTO_MOVILES.usuarios VALUES ('3-3333-3333', 'CLIENTE', 'pass789');

-- Insertar USUARIOS (REPARTIDORES)
INSERT INTO PROYECTO_MOVILES.usuarios VALUES ('4-4444-4444', 'REPARTIDOR', 'reparto123');
INSERT INTO PROYECTO_MOVILES.usuarios VALUES ('5-5555-5555', 'REPARTIDOR', 'delivery456');
INSERT INTO PROYECTO_MOVILES.usuarios VALUES ('6-6666-6666', 'REPARTIDOR', 'repartidor789');

-- Insertar USUARIOS (RESTAURANTES)
INSERT INTO PROYECTO_MOVILES.usuarios VALUES ('3101123456', 'RESTAURANTE', 'ticoRico123');
INSERT INTO PROYECTO_MOVILES.usuarios VALUES ('3101987654', 'RESTAURANTE', 'pastafeliz456');
INSERT INTO PROYECTO_MOVILES.usuarios VALUES ('3101765432', 'RESTAURANTE', 'zona506burgers');


