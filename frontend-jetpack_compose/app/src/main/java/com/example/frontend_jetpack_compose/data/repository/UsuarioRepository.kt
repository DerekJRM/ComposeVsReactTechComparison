package com.example.frontend_jetpack_compose.data.repository

import com.example.frontend_jetpack_compose.data.model.Usuario
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL

object UsuarioRepository {
    private const val BASE_URL = "http://10.0.2.2:8080/api"
    private val gson = Gson()

    suspend fun login(cedula: String, contrasena: String): Usuario? {
        val url = URL("$BASE_URL/login/$cedula/$contrasena")
        val connection = url.openConnection() as HttpURLConnection
        return try {
            connection.requestMethod = "GET"
            connection.connect()

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Usuario::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }

    suspend fun createUsuario(usuario: Usuario): Usuario? = withContext(Dispatchers.IO) {
        val url = URL("$BASE_URL/usuarios")
        val connection = url.openConnection() as HttpURLConnection
        try {
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.doOutput = true

            val jsonInputString = gson.toJson(usuario)
            connection.outputStream.use { os ->
                val input = jsonInputString.toByteArray(Charsets.UTF_8)
                os.write(input, 0, input.size)
            }

            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                gson.fromJson(response, Usuario::class.java)
            } else {
                null
            }
        } finally {
            connection.disconnect()
        }
    }
}