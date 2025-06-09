package com.example.frontend_jetpack_compose.data.model

data class Cliente(
    val cedula: String,
    val nombre: String,
    val direccion: String,
    val tarjeta: String,
    val telefono: String,
    val correo: String,
    val estado: String  // "ACTIVO" o "SUSPENDIDO"
)