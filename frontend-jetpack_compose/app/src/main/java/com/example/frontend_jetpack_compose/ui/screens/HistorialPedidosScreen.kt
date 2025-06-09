package com.example.frontend_jetpack_compose.ui.screens

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.frontend_jetpack_compose.data.model.Pedido
import com.example.frontend_jetpack_compose.data.repository.PedidoRepository
import java.time.format.DateTimeFormatter

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun HistorialPedidosScreen(navController: NavController) {
    val pedidos = PedidoRepository.obtenerPorCliente("current_user") // Temporal

    LazyColumn(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        items(pedidos) { pedido ->
            PedidoCard(
                pedido = pedido,
                onClick = { navController.navigate("seguimiento/${pedido.id}") }
            )
        }
    }
}

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun PedidoCard(pedido: Pedido, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("#${pedido.id}", style = MaterialTheme.typography.titleMedium)
                Text(
                    text = pedido.fechaHora.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")),
                    color = MaterialTheme.colorScheme.outline
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Estado: ${pedido.estado}")
                Text("₡${"%.2f".format(pedido.total)}",
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.primary)
            }
        }
    }
}