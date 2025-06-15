package com.example.backend.service

import com.example.backend.model.*

interface IService {
    // ========== USUARIO ==========
    fun getUsuarioById(cedula: String): Usuario?
    fun saveUsuario(usuario: Usuario): Usuario
    fun deleteUsuario(cedula: String)
    fun getAllUsuarios(): List<Usuario>

    // ========== CLIENTE ==========
    fun getClienteById(cedula: String): Cliente?
    fun saveCliente(cliente: Cliente): Cliente
    fun deleteCliente(cedula: String)
    fun getAllClientes(): List<Cliente>

    // ========== REPARTIDOR ==========
    fun getRepartidorById(cedula: String): Repartidor?
    fun saveRepartidor(repartidor: Repartidor): Repartidor
    fun deleteRepartidor(cedula: String)
    fun getAllRepartidores(): List<Repartidor>

    // ========== RESTAURANTE ==========
    fun getRestauranteById(cedulaJuridica: String): Restaurante?
    fun saveRestaurante(restaurante: Restaurante): Restaurante
    fun deleteRestaurante(cedulaJuridica: String)
    fun getAllRestaurantes(): List<Restaurante>

    // ========== COMBO ==========
    fun getComboById(id: Long): Combo?
    fun saveCombo(combo: Combo): Combo
    fun deleteCombo(id: Long)
    fun getAllCombos(): List<Combo>
    fun getCombosByRestaurante(restauranteId: String): List<Combo>

    // ========== PEDIDO ==========
    fun getPedidoById(id: Long): Pedido?
    fun savePedido(pedido: Pedido): Pedido
    fun deletePedido(id: Long)
    fun getAllPedidos(): List<Pedido>
    fun getPedidosByCliente(clienteId: String): List<Pedido>
    fun getPedidosByRestaurante(restauranteId: String): List<Pedido>
    fun getPedidosByRepartidor(repartidorId: String): List<Pedido>
    fun getPedidosByEstado(estado: String): List<Pedido>

    // ========== PEDIDO_COMBO ==========
    fun getPedidoComboById(pedidoId: Long, comboId: Long): PedidoCombo?
    fun savePedidoCombo(pedidoCombo: PedidoCombo): PedidoCombo
    fun deletePedidoCombo(pedidoId: Long, comboId: Long)
    fun getCombosByPedido(pedidoId: Long): List<PedidoCombo>
    fun getPedidosByCombo(comboId: Long): List<PedidoCombo>

    // ========== QUEJA ==========
    fun getQuejaById(id: Long): Queja?
    fun saveQueja(queja: Queja): Queja
    fun deleteQueja(id: Long)
    fun getAllQuejas(): List<Queja>
    fun getQuejasByCliente(clienteId: String): List<Queja>
    fun getQuejasByRepartidor(repartidorId: String): List<Queja>
    fun getQuejasByPedido(pedidoId: Long): Queja

    // ========== FACTURA ========== (solo lectura)
    fun getFacturaById(id: Long): Factura?
    fun getAllFacturas(): List<Factura>
    fun getFacturasByCliente(clienteId: String): List<Factura>
    fun getFacturasByRestaurante(restauranteId: String): List<Factura>
}