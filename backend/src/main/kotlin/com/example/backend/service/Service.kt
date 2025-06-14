package com.example.backend.service

import com.example.backend.model.*
import com.example.backend.repository.*
import org.springframework.stereotype.Service

@Service
class Service(
    private val usuarioRepository: UsuarioRepository,
    private val clienteRepository: ClienteRepository,
    private val repartidorRepository: RepartidorRepository,
    private val restauranteRepository: RestauranteRepository,
    private val comboRepository: ComboRepository,
    private val pedidoRepository: PedidoRepository,
    private val pedidoComboRepository: PedidoComboRepository,
    private val quejaRepository: QuejaRepository,
    private val facturaRepository: FacturaRepository
) : IService {

    // ========== USUARIO ==========
    override fun getUsuarioById(cedula: String): Usuario? {
        return usuarioRepository.findById(cedula).orElse(null)
    }

    override fun saveUsuario(usuario: Usuario): Usuario {
        return usuarioRepository.saveAndFlush(usuario)
    }

    override fun deleteUsuario(cedula: String) {
        usuarioRepository.deleteById(cedula)
    }

    override fun getAllUsuarios(): List<Usuario> {
        return usuarioRepository.findAll()
    }

    // ========== CLIENTE ==========
    override fun getClienteById(cedula: String): Cliente? {
        return clienteRepository.findById(cedula).orElse(null)
    }

    override fun saveCliente(cliente: Cliente): Cliente {
        return clienteRepository.saveAndFlush(cliente)
    }

    override fun deleteCliente(cedula: String) {
        clienteRepository.deleteById(cedula)
    }

    override fun getAllClientes(): List<Cliente> {
        return clienteRepository.findAll()
    }

    // ========== REPARTIDOR ==========
    override fun getRepartidorById(cedula: String): Repartidor? {
        return repartidorRepository.findById(cedula).orElse(null)
    }

    override fun saveRepartidor(repartidor: Repartidor): Repartidor {
        return repartidorRepository.saveAndFlush(repartidor)
    }

    override fun deleteRepartidor(cedula: String) {
        repartidorRepository.deleteById(cedula)
    }

    override fun getAllRepartidores(): List<Repartidor> {
        return repartidorRepository.findAll()
    }

    // ========== RESTAURANTE ==========
    override fun getRestauranteById(cedula: String): Restaurante? {
        return restauranteRepository.findById(cedula).orElse(null)
    }

    override fun saveRestaurante(restaurante: Restaurante): Restaurante {
        return restauranteRepository.saveAndFlush(restaurante)
    }

    override fun deleteRestaurante(cedula: String) {
        restauranteRepository.deleteById(cedula)
    }

    override fun getAllRestaurantes(): List<Restaurante> {
        return restauranteRepository.findAll()
    }

    // ========== COMBO ==========
    override fun getComboById(id: Long): Combo? {
        return comboRepository.findById(id).orElse(null)
    }

    override fun saveCombo(combo: Combo): Combo {
        return comboRepository.saveAndFlush(combo)
    }

    override fun deleteCombo(id: Long) {
        comboRepository.deleteById(id)
    }

    override fun getAllCombos(): List<Combo> {
        return comboRepository.findAll()
    }

    override fun getCombosByRestaurante(restauranteId: String): List<Combo> {
        return comboRepository.findByRestauranteId(restauranteId)
    }

    // ========== PEDIDO ==========
    override fun getPedidoById(id: Long): Pedido? {
        return pedidoRepository.findById(id).orElse(null)
    }

    override fun savePedido(pedido: Pedido): Pedido {
        return pedidoRepository.saveAndFlush(pedido)
    }

    override fun deletePedido(id: Long) {
        pedidoRepository.deleteById(id)
    }

    override fun getAllPedidos(): List<Pedido> {
        return pedidoRepository.findAll()
    }

    override fun getPedidosByCliente(clienteId: String): List<Pedido> {
        return pedidoRepository.findByClienteId(clienteId)
    }

    override fun getPedidosByRestaurante(restauranteId: String): List<Pedido> {
        return pedidoRepository.findByRestauranteId(restauranteId)
    }

    override fun getPedidosByRepartidor(repartidorId: String): List<Pedido> {
        return pedidoRepository.findByRepartidorId(repartidorId)
    }

    override fun getPedidosByEstado(estado: String): List<Pedido> {
        return pedidoRepository.findByEstado(estado)
    }

    // ========== PEDIDO_COMBO ==========
    override fun getPedidoComboById(pedidoId: Long, comboId: Long): PedidoCombo? {
        return pedidoComboRepository.findById(PedidoComboId(pedidoId, comboId)).orElse(null)
    }

    override fun savePedidoCombo(pedidoCombo: PedidoCombo): PedidoCombo {
        return pedidoComboRepository.saveAndFlush(pedidoCombo)
    }

    override fun deletePedidoCombo(pedidoId: Long, comboId: Long) {
        pedidoComboRepository.deleteById(PedidoComboId(pedidoId, comboId))
    }

    override fun getCombosByPedido(pedidoId: Long): List<PedidoCombo> {
        return pedidoComboRepository.findByPedidoId(pedidoId)
    }

    override fun getPedidosByCombo(comboId: Long): List<PedidoCombo> {
        return pedidoComboRepository.findByComboId(comboId)
    }

    // ========== QUEJA ==========
    override fun getQuejaById(id: Long): Queja? {
        return quejaRepository.findById(id).orElse(null)
    }

    override fun saveQueja(queja: Queja): Queja {
        return quejaRepository.saveAndFlush(queja)
    }

    override fun deleteQueja(id: Long) {
        quejaRepository.deleteById(id)
    }

    override fun getAllQuejas(): List<Queja> {
        return quejaRepository.findAllOrderByFechaDesc()
    }

    override fun getQuejasByCliente(clienteId: String): List<Queja> {
        return quejaRepository.findByClienteId(clienteId)
    }

    override fun getQuejasByRepartidor(repartidorId: String): List<Queja> {
        return quejaRepository.findByRepartidorId(repartidorId)
    }

    // ========== FACTURA ==========
    override fun getFacturaById(id: Long): Factura? {
        return facturaRepository.findById(id).orElse(null)
    }

    override fun getAllFacturas(): List<Factura> {
        return facturaRepository.findAll()
    }

    override fun getFacturasByCliente(clienteId: String): List<Factura> {
        return facturaRepository.findByClienteContainingIgnoreCase(clienteId)
    }

    override fun getFacturasByRestaurante(restauranteId: String): List<Factura> {
        return facturaRepository.findByRestauranteContainingIgnoreCase(restauranteId)
    }
}