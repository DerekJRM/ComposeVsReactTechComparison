package com.example.backend.repository

import com.example.backend.model.Pedido
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface PedidoRepository: JpaRepository<Pedido, Long> {
    fun findByClienteId(clienteId: String): List<Pedido>
    fun findByRestauranteId(restauranteId: String): List<Pedido>
    fun findByRepartidorId(repartidorId: String): List<Pedido>
    fun findByEstado(estado: String): List<Pedido>

    @Query("""
        SELECT p FROM Pedido p WHERE 
        p.clienteId = :clienteId AND 
        (p.estado = 'ENTREGADO' OR p.estado = 'FACTURADO')
        ORDER BY p.fechaPedido DESC
    """)
    fun findHistorialByClienteId(clienteId: String): List<Pedido>
}