package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.DetallePedido

object DetallePedidoRepository {
    private val detalles = mutableListOf<DetallePedido>()

    fun agregarDetalle(detalle: DetallePedido) {
        detalles.add(detalle)
    }

    fun obtenerPorPedido(pedidoId: Int): List<DetallePedido> {
        return detalles.filter { it.pedidoId == pedidoId }
    }
}