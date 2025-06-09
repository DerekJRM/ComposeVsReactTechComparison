package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.Cliente

object ClienteRepository {
    private val clientes = mutableListOf<Cliente>()

    fun registrarCliente(cliente: Cliente) {
        clientes.add(cliente)
    }

    fun buscarPorCedula(cedula: String): Cliente? = clientes.find { it.cedula == cedula }
    fun actualizarEstado(cedula: String, nuevoEstado: String) {
        clientes.replaceAll { if (it.cedula == cedula) it.copy(estado = nuevoEstado) else it }
    }
}
