package com.example.frontend_jetpack_compose.data.model

data class Repartidor(
    val cedula: String,
    val nombre: String,
    val correo: String,
    val direccion: String,
    val telefono: String,
    val tarjeta: String,
    val estado: String,  // "DISPONIBLE" u "OCUPADO"
    val amonestaciones: Int = 0,
    val kmDiarios: Double = 0.0
)