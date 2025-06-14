package com.example.frontend_jetpack_compose.data.model

import java.time.Instant

data class Pedido(
    val id: Long? = null,
    val clienteId: String,
    val restauranteId: String,
    val repartidorId: String,
    val estado: String,
    val fechaPedido: Instant,
    val fechaEntrega: Instant? = null,
    val subtotal: Double,
    val costoTransporte: Double,
    val iva: Double,
    val total: Double,
    val newItem: Boolean = false
)