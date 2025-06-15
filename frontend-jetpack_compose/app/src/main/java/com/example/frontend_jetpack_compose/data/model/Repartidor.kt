package com.example.frontend_jetpack_compose.data.model

data class Repartidor(
    val cedula: String,
    var nombre: String,
    var email: String,
    var direccion: String,
    var telefono: String,
    var numTarjeta: String,
    var estado: String,
    var distanciaPedidoKm: Double,
    var kmRecorridosDiarios: Double,
    val costoKmHabil: Double,
    val costoKmFeriado: Double,
    var amonestaciones: Double,
    val newItem: Boolean = false
)