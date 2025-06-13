ALTER SESSION SET "_ORACLE_SCRIPT" = TRUE; ALTER SYSTEM SET DB_16K_CACHE_SIZE=4M SCOPE=BOTH;

CREATE USER PROYECTO_MOVILES
  IDENTIFIED BY PROYECTO_MOVILES
  DEFAULT TABLESPACE USERS
  TEMPORARY TABLESPACE TEMP
  PROFILE DEFAULT
  ACCOUNT UNLOCK;
GRANT RESOURCE TO PROYECTO_MOVILES;
GRANT CONNECT TO PROYECTO_MOVILES;
ALTER USER PROYECTO_MOVILES DEFAULT ROLE ALL;
  GRANT CREATE VIEW TO PROYECTO_MOVILES;
GRANT UNLIMITED TABLESPACE TO PROYECTO_MOVILES;
  GRANT CREATE ANY TABLE TO PROYECTO_MOVILES WITH ADMIN OPTION;
  GRANT CREATE SESSION TO PROYECTO_MOVILES;

-- 2. TABLA DE CLIENTES
CREATE TABLE PROYECTO_MOVILES.clientes (
  cedula           VARCHAR2(12) NOT NULL PRIMARY KEY,
  nombre           VARCHAR2(100) NOT NULL,
  direccion        VARCHAR2(200) NOT NULL,
  telefono         VARCHAR2(20) NOT NULL,
  email            VARCHAR2(100) NOT NULL,
  num_tarjeta      VARCHAR2(30) NOT NULL,
  estado           VARCHAR2(10) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO','SUSPENDIDO'))
);

-- 3. TABLA DE RESTAURANTES
CREATE TABLE PROYECTO_MOVILES.restaurantes (
  cedula_juridica  VARCHAR2(20) NOT NULL PRIMARY KEY,
  nombre           VARCHAR2(100) NOT NULL,
  direccion        VARCHAR2(200) NOT NULL,
  tipo_comida      VARCHAR2(50) NOT NULL
);

-- 4. TABLA DE REPARTIDORES
CREATE TABLE PROYECTO_MOVILES.repartidores (
  cedula                  VARCHAR2(12) NOT NULL PRIMARY KEY,
  nombre                  VARCHAR2(100) NOT NULL,
  email                   VARCHAR2(100) NOT NULL,
  direccion               VARCHAR2(200) NOT NULL,
  telefono                VARCHAR2(20) NOT NULL,
  num_tarjeta             VARCHAR2(30) NOT NULL,
  estado                  VARCHAR2(10) DEFAULT 'DISPONIBLE' CHECK (estado IN ('DISPONIBLE','OCUPADO')),
  distancia_pedido_km     NUMBER(7,2),
  km_recorridos_diarios   NUMBER(7,2),
  costo_km_habil          NUMBER(7,2) DEFAULT 1000,
  costo_km_feriado        NUMBER(7,2) DEFAULT 1500,
  amonestaciones          NUMBER(1) DEFAULT 0 CHECK (amonestaciones BETWEEN 0 AND 4)
);

-- 5. TABLA DE COMBOS (por restaurante)
CREATE TABLE PROYECTO_MOVILES.combos (
  combo_id        NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  restaurante_id  VARCHAR2(20) NOT NULL REFERENCES PROYECTO_MOVILES.restaurantes(cedula_juridica),
  combo_num       NUMBER(2) NOT NULL CHECK (combo_num BETWEEN 1 AND 9),
  precio          NUMBER(10,2) NOT NULL,
  UNIQUE(restaurante_id, combo_num)
);

-- 6. TABLA DE PEDIDOS
CREATE TABLE PROYECTO_MOVILES.pedidos (
  pedido_id        NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cliente_id       VARCHAR2(12) NOT NULL
                     REFERENCES PROYECTO_MOVILES.clientes(cedula),
  restaurante_id   VARCHAR2(20) NOT NULL
                     REFERENCES PROYECTO_MOVILES.restaurantes(cedula_juridica),
  repartidor_id    VARCHAR2(12)
                     REFERENCES PROYECTO_MOVILES.repartidores(cedula),
  estado           VARCHAR2(15) DEFAULT 'EN_PREPARACION'
                     CHECK (estado IN (
                       'EN_PREPARACION','EN_CAMINO','SUSPENDIDO','ENTREGADO'
                     )),
  fecha_pedido     TIMESTAMP DEFAULT SYSTIMESTAMP,
  fecha_entrega    TIMESTAMP,
  subtotal         NUMBER(12,2) NOT NULL,
  costo_transporte NUMBER(12,2) NOT NULL,
  iva              NUMBER(12,2)
                     GENERATED ALWAYS AS (subtotal * 0.13) VIRTUAL,
  total            NUMBER(12,2)
                     GENERATED ALWAYS AS (
                       subtotal
                       + costo_transporte
                       + (subtotal * 0.13)
                     ) VIRTUAL
);

-- 7. DETALLE DE PEDIDO (combos)
CREATE TABLE PROYECTO_MOVILES.pedido_combos (
  pedido_id   NUMBER NOT NULL REFERENCES PROYECTO_MOVILES.pedidos(pedido_id) ON DELETE CASCADE,
  combo_id    NUMBER NOT NULL REFERENCES PROYECTO_MOVILES.combos(combo_id),
  cantidad    NUMBER(3) DEFAULT 1 CHECK (cantidad >= 1),
  precio_unit NUMBER(10,2) NOT NULL,
  PRIMARY KEY(pedido_id, combo_id)
);

-- 8. QUEJAS DE REPARTIDORES
CREATE TABLE PROYECTO_MOVILES.quejas (
  queja_id        NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  repartidor_id   VARCHAR2(12) NOT NULL REFERENCES PROYECTO_MOVILES.repartidores(cedula) ON DELETE CASCADE,
  cliente_id      VARCHAR2(12) NOT NULL REFERENCES PROYECTO_MOVILES.clientes(cedula),
  descripcion     VARCHAR2(4000) NOT NULL,
  fecha_queja     DATE DEFAULT SYSDATE
);

-- 9. VIEW: FACTURAS SIMPLIFICADAS
CREATE OR REPLACE VIEW PROYECTO_MOVILES.vw_facturas AS
SELECT
  p.pedido_id         AS id,
  c.nombre            AS cliente,
  r.nombre            AS restaurante,
  p.fecha_pedido,
  p.subtotal,
  p.costo_transporte,
  p.iva,
  p.total
FROM PROYECTO_MOVILES.pedidos p
JOIN PROYECTO_MOVILES.clientes c      ON p.cliente_id      = c.cedula
JOIN PROYECTO_MOVILES.restaurantes r  ON p.restaurante_id  = r.cedula_juridica;

-- 10. ÍNDICES ADICIONALES
CREATE INDEX idx_pedidos_estado ON PROYECTO_MOVILES.pedidos(estado);
CREATE INDEX idx_repartidores_estado ON PROYECTO_MOVILES.repartidores(estado);

CREATE TABLE PROYECTO_MOVILES.usuarios (
  cedula          VARCHAR2(12) NOT NULL PRIMARY KEY,
  rol             VARCHAR2(12) DEFAULT 'CLIENTE'
                      CHECK (rol IN ('CLIENTE','REPARTIDOR')),
  contrasena   VARCHAR2(200) NOT NULL
);


-- Alteracion para Usuarios de tipo Restaurante

ALTER TABLE PROYECTO_MOVILES.usuarios
DROP CONSTRAINT SYS_C008717;

-- 2. Agregar una nueva que sí acepte los tres roles
ALTER TABLE PROYECTO_MOVILES.usuarios
ADD CONSTRAINT chk_roles_usuario CHECK (rol IN ('CLIENTE', 'REPARTIDOR', 'RESTAURANTE'));

ALTER TABLE PROYECTO_MOVILES.combos
ADD descripcion VARCHAR2(200);