package com.example.frontend_jetpack_compose.data.model

import java.time.LocalDateTime

data class Pedido(
    val id: Int? = null,  // Auto-generado
    val clienteCedula: String,
    val restauranteCedulaJuridica: String,
    val repartidorCedula: String? = null,
    val estado: String,  // "PREPARACION", "CAMINO", etc.
    val fechaHora: LocalDateTime,
    val fechaEntrega: LocalDateTime? = null,
    val subtotal: Double,
    val costoTransporte: Double,
    val iva: Double,
    val total: Double,
    val distancia: Double
)