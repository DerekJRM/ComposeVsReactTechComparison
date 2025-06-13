package com.example.frontend_jetpack_compose.data.model

data class Combo(
    val id: Int? = null,
    val restauranteId: String,
    val comboNum: Short,
    val precio: Double,
    val newItem: Boolean = false
)