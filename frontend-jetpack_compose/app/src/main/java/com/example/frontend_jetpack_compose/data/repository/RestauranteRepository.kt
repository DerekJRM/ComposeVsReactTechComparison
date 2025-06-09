package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.Restaurante

object RestauranteRepository {
    private val restaurantes = mutableListOf<Restaurante>()
    private var lastId = 0

    fun agregarRestaurante(restaurante: Restaurante) {
        restaurantes.add(restaurante.copy(cedulaJuridica = "RES-${++lastId}"))
    }

    fun obtenerTodos(): List<Restaurante> = restaurantes
    fun buscarPorTipo(tipo: String): List<Restaurante> = restaurantes.filter { it.tipoComida == tipo }
    fun obtenerPorId(id: String): Restaurante? = restaurantes.find { it.cedulaJuridica == id }
}