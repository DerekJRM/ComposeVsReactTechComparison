package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.Combo

object ComboRepository {
    private val combos = mutableListOf<Combo>()

    fun agregarCombo(restauranteId: String, numeroCombo: Int) {
        combos.add(Combo(restauranteCedulaJuridica = restauranteId, numeroCombo = numeroCombo))
    }

    fun obtenerCombosPorRestaurante(restauranteId: String): List<Combo> {
        return combos.filter { it.restauranteCedulaJuridica == restauranteId }
    }

    fun obtenerCombo(comboId: Int): Combo? {
        return combos.find { it.id == comboId }
    }
}