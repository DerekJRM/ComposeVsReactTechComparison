package com.example.frontend_jetpack_compose.data.model

import java.time.LocalDate

data class Queja(
    val id: Int? = null,  // Auto-generado
    val repartidorCedula: String,
    val clienteCedula: String,
    val descripcion: String,
    val fecha: LocalDate
)