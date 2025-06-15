package com.example.frontend_jetpack_compose.data.model

data class PedidoCombo(
    val pedidoId: Long,
    val comboId: Long,
    val cantidad: Short,
    val precioUnit: Double,
    val newItem: Boolean = false,
)