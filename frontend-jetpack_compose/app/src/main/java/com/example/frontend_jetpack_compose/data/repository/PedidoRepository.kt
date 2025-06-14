package com.example.frontend_jetpack_compose.data.repository

import com.google.gson.Gson
import com.example.frontend_jetpack_compose.data.model.Pedido
import com.example.frontend_jetpack_compose.data.model.PedidoCombo
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

object PedidoRepository {
    private const val BASE_URL = "http://10.0.2.2:8080/api"
    private val gson = Gson()

    suspend fun createPedido(pedido: Pedido): Pedido? = withContext(Dispatchers.IO) {
        val url = "$BASE_URL/pedidos"
        val connection = java.net.URL(url).openConnection() as java.net.HttpURLConnection
        return@withContext try {
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.doOutput = true

            val jsonInputString = gson.toJson(pedido)
            connection.outputStream.use { os ->
                val input = jsonInputString.toByteArray(Charsets.UTF_8)
                os.write(input, 0, input.size)
            }

            if (connection.responseCode == java.net.HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Pedido::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }

    suspend fun addComboToPedido(pedidoCombo: PedidoCombo): PedidoCombo? = withContext(Dispatchers.IO) {
        val url = "$BASE_URL/pedidos/${pedidoCombo.pedidoId}/combos"
        val connection = java.net.URL(url).openConnection() as java.net.HttpURLConnection
        return@withContext try {
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.doOutput = true

            val jsonInputString = gson.toJson(pedidoCombo)
            connection.outputStream.use { os ->
                val input = jsonInputString.toByteArray(Charsets.UTF_8)
                os.write(input, 0, input.size)
            }

            if (connection.responseCode == java.net.HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, PedidoCombo::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }

}