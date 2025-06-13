package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.Cliente
import com.example.frontend_jetpack_compose.data.model.Repartidor
import com.example.frontend_jetpack_compose.data.model.Usuario
import com.google.gson.Gson
import java.net.HttpURLConnection
import java.net.URL

object RepartidorRepository {
    private const val BASE_URL = "http://10.0.2.2:8080/api"
    private val gson = Gson()

    suspend fun getRepartidorById(cedula: String): Repartidor? {
        val url = URL("$BASE_URL/getRepartidorById/$cedula")
        val connection = url.openConnection() as HttpURLConnection
        return try {
            connection.requestMethod = "GET"
            connection.connect()

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Repartidor::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }
}