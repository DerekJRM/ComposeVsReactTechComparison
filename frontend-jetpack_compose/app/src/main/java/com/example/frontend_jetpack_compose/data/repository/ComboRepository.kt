package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.Combo
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL

object ComboRepository {
    private const val BASE_URL = "http://10.0.2.2:8080/api"
    private val gson = Gson()

    suspend fun getCombosByRestaurante(cedula: String): List<Combo>? {
        val url = URL("$BASE_URL/restaurantes/$cedula/combos")
        val connection = url.openConnection() as HttpURLConnection
        return try {
            connection.requestMethod = "GET"
            connection.connect()

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Array<Combo>::class.java).toList()
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }

    suspend fun deleteCombo(id: Long): Boolean = withContext(Dispatchers.IO) {
        val url = URL("$BASE_URL/combos/$id")
        val connection = url.openConnection() as HttpURLConnection
        return@withContext try {
            connection.requestMethod = "DELETE"
            connection.connect()

            connection.responseCode == HttpURLConnection.HTTP_OK
        } finally {
            connection.disconnect()
        }
    }

    suspend fun createCombo(combo: Combo): Combo? = withContext(Dispatchers.IO) {
        val url = URL("$BASE_URL/combos")
        val connection = url.openConnection() as HttpURLConnection
        try {
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.doOutput = true

            val jsonInputString = gson.toJson(combo)
            connection.outputStream.use { os ->
                val input = jsonInputString.toByteArray(Charsets.UTF_8)
                os.write(input, 0, input.size)
            }

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Combo::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }

    suspend fun updateCombo(combo: Combo): Combo? = withContext(Dispatchers.IO) {
        val url = URL("$BASE_URL/combos/${combo.id}")
        val connection = url.openConnection() as HttpURLConnection
        try {
            connection.requestMethod = "PUT"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.doOutput = true

            val jsonInputString = gson.toJson(combo)
            connection.outputStream.use { os ->
                val input = jsonInputString.toByteArray(Charsets.UTF_8)
                os.write(input, 0, input.size)
            }

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Combo::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }

    suspend fun getComboById(id: Long): Combo? = withContext(Dispatchers.IO) {
        val url = URL("$BASE_URL/combos/$id")
        val connection = url.openConnection() as HttpURLConnection
        return@withContext try {
            connection.requestMethod = "GET"
            connection.connect()

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Combo::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }
}