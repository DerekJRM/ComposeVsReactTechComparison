package com.example.frontend_jetpack_compose.data.model

data class Restaurante(
    val cedulaJuridica: String,
    var nombre: String,
    var direccion: String,
    var tipoComida: String,
    val newItem: Boolean = false
)