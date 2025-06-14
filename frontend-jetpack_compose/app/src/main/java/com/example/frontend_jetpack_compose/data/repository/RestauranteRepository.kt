package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.Restaurante
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

object RestauranteRepository {
    private const val BASE_URL = "http://10.0.2.2:8080/api"
    private val gson = Gson()

    suspend fun getRestauranteById(cedulaJuridica: String): Restaurante? {
        val url = "$BASE_URL/restaurantes/$cedulaJuridica"
        val connection = java.net.URL(url).openConnection() as java.net.HttpURLConnection
        return try {
            connection.requestMethod = "GET"
            connection.connect()

            if (connection.responseCode == java.net.HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Restaurante::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }

    suspend fun updateRestaurante(restaurante: Restaurante): Restaurante? = withContext(Dispatchers.IO) {
        val url = "$BASE_URL/restaurantes/${restaurante::class.java.getMethod("getCedulaJuridica").invoke(restaurante)}"
        val connection = java.net.URL(url).openConnection() as java.net.HttpURLConnection
        try {
            connection.requestMethod = "PUT"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.doOutput = true

            val jsonInputString = gson.toJson(restaurante)
            connection.outputStream.use { os ->
                val input = jsonInputString.toByteArray(Charsets.UTF_8)
                os.write(input, 0, input.size)
            }

            if (connection.responseCode == java.net.HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Restaurante::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }

    suspend fun getAllRestaurantes(): List<Restaurante> = withContext(Dispatchers.IO){
        val url = "$BASE_URL/restaurantes"
        val connection = java.net.URL(url).openConnection() as java.net.HttpURLConnection
        return@withContext try {
            connection.requestMethod = "GET"
            connection.connect()

            if (connection.responseCode == java.net.HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Array<Restaurante>::class.java).toList()
            } else {
                emptyList()
            }
        } finally {
            connection.disconnect()
        }
    }
}