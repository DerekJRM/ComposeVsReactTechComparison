package com.example.frontend_jetpack_compose.data.repository

import android.os.Build
import androidx.annotation.RequiresApi
import com.example.frontend_jetpack_compose.data.model.Pedido
import com.example.frontend_jetpack_compose.utils.FeriadosHelper
import java.time.LocalDate

object PedidoRepository {
    internal val pedidos = mutableListOf<Pedido>()
    private var lastId = 0

    fun obtenerPorCliente(cedula: String): List<Pedido> = pedidos.filter { it.clienteCedula == cedula }
    fun actualizarEstado(pedidoId: Int, nuevoEstado: String) {
        pedidos.replaceAll {
            if (it.id == pedidoId) it.copy(estado = nuevoEstado) else it
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun crearPedido(pedido: Pedido): Pedido {
        val newPedido = pedido.copy(id = ++lastId)

        // Obtener detalles del pedido
        val detalles = DetallePedidoRepository.obtenerPorPedido(newPedido.id ?: 0)

        // Obtener combos del restaurante
        val combos = ComboRepository.obtenerCombosPorRestaurante(newPedido.restauranteCedulaJuridica)

        // Calcular subtotal
        val subtotal = detalles.sumOf { detalle ->
            val combo = combos.find { it.id == detalle.comboId }
            val precioCombo = 4000.0 + ((combo?.numeroCombo ?: 1) - 1) * 1000.0
            precioCombo * detalle.cantidad
        }

        // Calcular transporte
        val costoTransporte = if (FeriadosHelper.esFeriado()) {
            newPedido.distancia * 1500
        } else {
            newPedido.distancia * 1000
        }

        // Calcular totales
        val iva = subtotal * 0.13
        val total = subtotal + costoTransporte + iva

        val pedidoActualizado = newPedido.copy(
            subtotal = subtotal,
            costoTransporte = costoTransporte,
            iva = iva,
            total = total
        )

        pedidos.add(pedidoActualizado)
        return pedidoActualizado
    }
}