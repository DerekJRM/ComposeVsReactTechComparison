package com.example.frontend_jetpack_compose.data.model

data class Cliente(
    val cedula: String,
    val nombre: String,
    val direccion: String,
    val telefono: String,
    val email: String,
    val numTarjeta: String,
    val estado: String,
    val newItem: Boolean = false
)