package com.example.frontend_jetpack_compose.data.model

data class Restaurante(
    val cedulaJuridica: String,
    val nombre: String,
    val direccion: String,
    val tipoComida: String,
    val newItem: Boolean = false
)