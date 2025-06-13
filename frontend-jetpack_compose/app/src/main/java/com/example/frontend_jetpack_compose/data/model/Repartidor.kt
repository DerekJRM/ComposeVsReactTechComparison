package com.example.frontend_jetpack_compose.data.model

data class Repartidor(
    val cedula: String,
    val nombre: String,
    val email: String,
    val direccion: String,
    val telefono: String,
    val numTarjeta: String,
    val estado: String,
    val distanciaPedidoKm: Double,
    val kmRecorridosDiarios: Double,
    val costoKmHabil: Double,
    val costoKmFeriado: Double,
    val amonestaciones: Double,
    val newItem: Boolean = false
)