package com.example.frontend_jetpack_compose.ui.screens

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.Button
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.wear.compose.material.Stepper
import com.example.frontend_jetpack_compose.data.repository.PedidoRepository
import com.example.frontend_jetpack_compose.data.repository.RepartidorRepository
import com.example.frontend_jetpack_compose.data.repository.RestauranteRepository
import java.time.format.DateTimeFormatter

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun SeguimientoPedidoScreen(navController: NavController, pedidoId: Int) {
    val pedido = PedidoRepository.pedidos.find { it.id == pedidoId }
    val estados = listOf("PREPARACION", "CAMINO", "ENTREGADO")
    val currentStateIndex = estados.indexOf(pedido?.estado ?: "PREPARACION")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Seguimiento de Pedido #${pedidoId}",
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            estados.forEachIndexed { index, estado ->
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    val isActive = index <= currentStateIndex
                    Icon(
                        imageVector = if (isActive) Icons.Filled.CheckCircle else Icons.Filled.Clear,
                        contentDescription = null,
                        tint = if (isActive) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline
                    )
                    Text(
                        text = estado,
                        style = MaterialTheme.typography.labelMedium,
                        color = if (isActive) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline
                    )
                }
            }
        }

        // Detalles del pedido
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                InfoRow("Restaurante", pedido?.restauranteCedulaJuridica?.let {
                    RestauranteRepository.obtenerPorId(it)?.nombre ?: "N/A"
                })
                InfoRow("Repartidor", pedido?.repartidorCedula?.let {
                    RepartidorRepository.repartidores.find { r -> r.cedula == it }?.nombre ?: "N/A"
                })
                InfoRow("Hora de entrega", pedido?.fechaEntrega?.format(DateTimeFormatter.ofPattern("HH:mm")))
            }
        }

        Spacer(modifier = Modifier.weight(1f))

        Button(
            onClick = { navController.popBackStack() },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Volver al inicio")
        }
    }
}

@Composable
fun InfoRow(label: String, value: String?) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(label, style = MaterialTheme.typography.bodyMedium)
        Text(value ?: "N/A", style = MaterialTheme.typography.bodyLarge)
    }
}