package com.example.frontend_jetpack_compose.ui.screens

import android.widget.Toast
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import com.example.frontend_jetpack_compose.data.model.Cliente
import com.example.frontend_jetpack_compose.data.model.Repartidor
import com.example.frontend_jetpack_compose.data.model.Restaurante
import com.example.frontend_jetpack_compose.data.repository.ClienteRepository
import com.example.frontend_jetpack_compose.data.repository.RepartidorRepository
import com.example.frontend_jetpack_compose.data.repository.RestauranteRepository
import kotlinx.coroutines.launch

@Composable
fun PerfilScreen(
    rol: String,
    cliente: Cliente? = null,
    repartidor: Repartidor? = null,
    restaurante: Restaurante? = null
) {
    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            elevation = CardDefaults.cardElevation(8.dp)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Información del perfil",
                    style = MaterialTheme.typography.headlineSmall,
                    modifier = Modifier.padding(bottom = 12.dp)
                )

                when (rol) {
                    "CLIENTE" -> cliente?.let {
                        InfoText("Cédula", it.cedula)
                        EditableField("Nombre", it.nombre) { newValue -> cliente.nombre = newValue }
                        EditableField("Dirección", it.direccion) { newValue -> cliente.direccion = newValue }
                        EditableField("Teléfono", it.telefono) { newValue -> cliente.telefono = newValue }
                        EditableField("Email", it.email) { newValue -> cliente.email = newValue }
                        EditableField("Número de Tarjeta", it.numTarjeta) { newValue -> cliente.numTarjeta = newValue }
                        InfoText("Estado", it.estado)
                    }
                    "REPARTIDOR" -> repartidor?.let {
                        InfoText("Cédula", it.cedula)
                        EditableField("Nombre", it.nombre) { newValue -> repartidor.nombre = newValue }
                        EditableField("Dirección", it.direccion) { newValue -> repartidor.direccion = newValue }
                        EditableField("Teléfono", it.telefono) { newValue -> repartidor.telefono = newValue }
                        EditableField("Email", it.email) { newValue -> repartidor.email = newValue }
                        EditableField("Número de Tarjeta", it.numTarjeta) { newValue -> repartidor.numTarjeta = newValue }
                        InfoText("Estado", it.estado)

                        Divider(modifier = Modifier.padding(vertical = 8.dp))

                        InfoText("Km Recorridos Diarios", it.kmRecorridosDiarios.toString())
                        InfoText("Costo por Km Hábil", it.costoKmHabil.toString())
                        InfoText("Costo por Km Feriado", it.costoKmFeriado.toString())
                        InfoText("Amonestaciones", it.amonestaciones.toString())
                    }
                    "RESTAURANTE" -> restaurante?.let {
                        InfoText("Cédula Jurídica", it.cedulaJuridica)
                        EditableField("Nombre", it.nombre) { newValue -> restaurante.nombre = newValue }
                        EditableField("Dirección", it.direccion) { newValue -> restaurante.direccion = newValue }
                        EditableField("Tipo de Comida", it.tipoComida) { newValue -> restaurante.tipoComida = newValue }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = {
                coroutineScope.launch {
                    val result = when (rol) {
                        "CLIENTE" -> cliente?.let { ClienteRepository.updateCliente(it.copy()) }
                        "REPARTIDOR" -> repartidor?.let { RepartidorRepository.updateRepartidor(it.copy()) }
                        "RESTAURANTE" -> restaurante?.let { RestauranteRepository.updateRestaurante(it.copy()) }
                        else -> null
                    }

                    if (result != null) {
                        Toast.makeText(context, "Perfil actualizado con éxito", Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(context, "Error al actualizar el perfil", Toast.LENGTH_LONG).show()
                    }
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
        ) {
            Text("Guardar Cambios", style = MaterialTheme.typography.titleMedium)
        }
    }
}


@Composable
fun EditableField(label: String, initialValue: String, onValueChanged: (String) -> Unit) {
    var value by remember { mutableStateOf(TextFieldValue(initialValue)) }

    OutlinedTextField(
        value = value,
        onValueChange = {
            value = it
            onValueChanged(it.text)
        },
        label = { Text(label) },
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        singleLine = true
    )
}

@Composable
fun InfoText(label: String, value: String) {
    Column(modifier = Modifier.padding(vertical = 4.dp)) {
        Text(label, style = MaterialTheme.typography.labelSmall)
        Text(
            text = value,
            style = MaterialTheme.typography.bodyLarge,
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 8.dp, top = 2.dp, bottom = 8.dp)
        )
    }
}
