package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.Repartidor

object RepartidorRepository {
    internal val repartidores = mutableListOf<Repartidor>()

    fun registrarRepartidor(repartidor: Repartidor) {
        repartidores.add(repartidor)
    }

    fun obtenerDisponibles(): List<Repartidor> = repartidores.filter {
        it.estado == "DISPONIBLE" && it.amonestaciones < 4
    }

    fun agregarAmonestacion(cedula: String) {
        repartidores.replaceAll {
            if (it.cedula == cedula) it.copy(amonestaciones = it.amonestaciones + 1) else it
        }
    }

    fun asignarRepartidor(): Repartidor? {
        return repartidores.firstOrNull { it.estado == "DISPONIBLE" && it.amonestaciones < 4 }
    }
}