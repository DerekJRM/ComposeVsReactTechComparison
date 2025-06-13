package com.example.frontend_jetpack_compose.data.model

data class Factura(
    val id: Long? = null,
    val cliente: String,
    val restaurante: String,
    val fechaPedido: String,
    val subtotal: Double,
    val costoTransporte: Double,
    val iva: Double? = null,
    val total: Double? = null,
)