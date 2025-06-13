package com.example.frontend_jetpack_compose.data.model

import java.time.LocalDate

data class Queja(
    val id: Int? = null,
    val repartidorId: String,
    val clienteId: String,
    val descripcion: String,
    val fechaQueja: LocalDate,
    val newItem: Boolean = false
)