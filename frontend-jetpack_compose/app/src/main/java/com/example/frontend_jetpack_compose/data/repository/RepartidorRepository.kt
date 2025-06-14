package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.Repartidor
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL

object RepartidorRepository {
    private const val BASE_URL = "http://10.0.2.2:8080/api"
    private val gson = Gson()

    suspend fun createRepartidor(repartidor: Repartidor): Repartidor? = withContext(Dispatchers.IO) {
        val url = URL("$BASE_URL/repartidores")
        val connection = url.openConnection() as HttpURLConnection
        try {
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.doOutput = true

            val jsonInputString = gson.toJson(repartidor)
            connection.outputStream.use { os ->
                val input = jsonInputString.toByteArray(Charsets.UTF_8)
                os.write(input, 0, input.size)
            }

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

    suspend fun updateRepartidor(repartidor: Repartidor): Repartidor? = withContext(Dispatchers.IO) {
        val url = URL("$BASE_URL/repartidores/${repartidor.cedula}")
        val connection = url.openConnection() as HttpURLConnection
        try {
            connection.requestMethod = "PUT"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.doOutput = true

            val jsonInputString = gson.toJson(repartidor)
            connection.outputStream.use { os ->
                val input = jsonInputString.toByteArray(Charsets.UTF_8)
                os.write(input, 0, input.size)
            }

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

    suspend fun getAllRepartidores(): List<Repartidor> = withContext(Dispatchers.IO) {
        val url = URL("$BASE_URL/repartidores")
        val connection = url.openConnection() as HttpURLConnection
        return@withContext try {
            connection.requestMethod = "GET"
            connection.connect()

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Array<Repartidor>::class.java).toList()
            } else {
                emptyList()
            }
        } finally {
            connection.disconnect()
        }
    }
}