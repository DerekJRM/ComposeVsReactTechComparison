package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.Queja

object QuejaRepository {
    private val quejas = mutableListOf<Queja>()
    private var lastId = 0

    fun registrarQueja(queja: Queja) {
        quejas.add(queja.copy(id = ++lastId))
    }

    fun obtenerPorRepartidor(cedula: String): List<Queja> = quejas.filter { it.repartidorCedula == cedula }
}