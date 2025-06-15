package com.example.frontend_jetpack_compose.data.model

data class Combo(
    val id: Long? = null,
    val restauranteId: String,
    val comboNum: Short,
    val precio: Double,
    val descripcion: String,
    val newItem: Boolean = false
)