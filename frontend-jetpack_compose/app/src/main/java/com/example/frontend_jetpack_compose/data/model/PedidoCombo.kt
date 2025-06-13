package com.example.frontend_jetpack_compose.data.model

import java.time.Instant
import java.time.LocalDateTime

data class PedidoCombo(
    val pedidoId: Long,
    val comboId: Long,
    val cantidad: Short,
    val precioUnit: Double,
    val newItem: Boolean = false,
)