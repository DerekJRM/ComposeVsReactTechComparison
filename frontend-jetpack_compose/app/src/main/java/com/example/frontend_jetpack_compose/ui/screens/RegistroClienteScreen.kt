package com.example.frontend_jetpack_compose.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.frontend_jetpack_compose.data.model.Cliente
import com.example.frontend_jetpack_compose.data.repository.ClienteRepository

@Composable
fun RegistroClienteScreen(navController: NavController) {
    var cedula by remember { mutableStateOf("") }
    var nombre by remember { mutableStateOf("") }
    var error by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        TextField(
            value = cedula,
            onValueChange = { cedula = it },
            label = { Text("Cédula") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
        )

        TextField(
            value = nombre,
            onValueChange = { nombre = it },
            label = { Text("Nombre completo") }
        )

        Button(
            onClick = {
                if (cedula.isBlank() || nombre.isBlank()) {
                    error = "Todos los campos son obligatorios"
                } else if (ClienteRepository.buscarPorCedula(cedula) != null) {
                    error = "Cédula ya registrada"
                } else {
                    ClienteRepository.registrarCliente(
                        Cliente(
                            cedula = cedula,
                            nombre = nombre,
                            direccion = "",
                            tarjeta = "",
                            telefono = "",
                            correo = "",
                            estado = "ACTIVO"
                        )
                    )
                    navController.popBackStack()
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Registrarse")
        }

        error?.let {
            Text(text = it, color = MaterialTheme.colorScheme.error)
        }
    }
}