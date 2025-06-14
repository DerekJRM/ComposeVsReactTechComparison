package com.example.frontend_jetpack_compose.data.model

data class Cliente(
    val cedula: String,
    var nombre: String,
    var direccion: String,
    var telefono: String,
    var email: String,
    var numTarjeta: String,
    val estado: String,
    val newItem: Boolean = false
)