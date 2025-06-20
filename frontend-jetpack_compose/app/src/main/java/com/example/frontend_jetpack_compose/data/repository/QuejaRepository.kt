package com.example.frontend_jetpack_compose.data.repository

import android.os.Build
import androidx.annotation.RequiresApi
import com.example.frontend_jetpack_compose.data.LocalDateAdapter
import com.example.frontend_jetpack_compose.data.model.Queja
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL
import java.time.LocalDate

object QuejaRepository {
    private const val BASE_URL = "http://10.0.2.2:8080/api"
    @RequiresApi(Build.VERSION_CODES.O)
    private val gson: Gson = GsonBuilder()
        .registerTypeAdapter(LocalDate::class.java, LocalDateAdapter())
        .create()

    @RequiresApi(Build.VERSION_CODES.O)
    suspend fun createQueja(queja: Queja): Queja? = withContext(Dispatchers.IO) {
        val url = "$BASE_URL/quejas"
        val connection = URL(url).openConnection() as HttpURLConnection
        return@withContext try {
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.doOutput = true

            val jsonInputString = gson.toJson(queja)
            connection.outputStream.use { os ->
                val input = jsonInputString.toByteArray(Charsets.UTF_8)
                os.write(input, 0, input.size)
            }

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Queja::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    suspend fun getQuejasByPedido(pedidoId: Long): Queja? = withContext(Dispatchers.IO) {
        val url = "$BASE_URL/pedidos/$pedidoId/quejas"
        val connection = URL(url).openConnection() as HttpURLConnection
        return@withContext try {
            connection.requestMethod = "GET"
            connection.connect()

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Queja::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }
}