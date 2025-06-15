package com.example.frontend_jetpack_compose.data.model

import java.time.LocalDate

data class Pedido(
    val id: Long? = null,
    val clienteId: String,
    val restauranteId: String,
    val repartidorId: String,
    var estado: String,
    val fechaPedido: LocalDate,
    var fechaEntrega: LocalDate? = null,
    val subtotal: Double,
    val costoTransporte: Double,
    val iva: Double,
    val total: Double,
    val newItem: Boolean = false
)