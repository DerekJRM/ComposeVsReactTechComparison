package com.example.frontend_jetpack_compose.ui.screens

import android.os.Build
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.frontend_jetpack_compose.data.model.Cliente
import com.example.frontend_jetpack_compose.data.model.Pedido
import com.example.frontend_jetpack_compose.data.model.Repartidor
import com.example.frontend_jetpack_compose.data.model.Restaurante
import com.example.frontend_jetpack_compose.data.repository.ClienteRepository
import com.example.frontend_jetpack_compose.data.repository.PedidoRepository
import com.example.frontend_jetpack_compose.data.repository.RepartidorRepository
import com.example.frontend_jetpack_compose.data.repository.RestauranteRepository
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import java.time.LocalDate
import kotlin.system.measureTimeMillis

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun PedidosScreen(
    navController: NavHostController,
    cliente: Cliente? = null,
    repartidor: Repartidor? = null,
    rol: String
) {
    val context = LocalContext.current
    var pedidos by remember { mutableStateOf<List<Pedido>>(emptyList()) }
    val scope = rememberCoroutineScope()

    LaunchedEffect(cliente) {
        scope.launch {
            val time = measureTimeMillis {
                if (rol == "CLIENTE") {
                    cliente?.cedula?.let { cedula ->
                        pedidos = PedidoRepository.getPedidosByCliente(cedula)
                    }
                } else if (rol == "REPARTIDOR") {
                    repartidor?.cedula?.let { cedula ->
                        pedidos = PedidoRepository.getPedidosByRepartidor(cedula)
                    }
                }
            }
            println("Tiempo de carga y renderizado de pedidos: ${time}ms")
        }
    }

    Column(modifier = Modifier.padding(16.dp)) {
        Text("Historial de Pedidos", style = MaterialTheme.typography.headlineSmall)
        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn {
            items(pedidos) { pedido ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 4.dp)
                        .clickable {
                             navController.navigate("detalle_pedido/${pedido.id}/$rol")
                        },
                    elevation = CardDefaults.cardElevation(4.dp)
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        var restaurante by remember { mutableStateOf<Restaurante?>(null) }
                        var cliente by remember { mutableStateOf<Cliente?>(null) }

                        LaunchedEffect(pedido.restauranteId) {
                            restaurante = RestauranteRepository.getRestauranteById(pedido.restauranteId)
                        }
                        LaunchedEffect(pedido.clienteId) {
                            cliente = ClienteRepository.getClienteById(pedido.clienteId)
                        }

                        Text("Pedido #${pedido.id ?: "-"}", style = MaterialTheme.typography.titleMedium)
                        Text("Fecha: ${pedido.fechaPedido}")
                        Text("Restaurante: ${restaurante?.nombre ?: "Desconocido"}")

                        if (rol == "CLIENTE") {
                            Text("Repartidor: ${repartidor?.nombre ?: "Desconocido"}")
                        } else {
                            Text("Cliente: ${cliente?.nombre ?: "Desconocido"}")
                        }

                        Text("Estado: ${pedido.estado}")
                        Text("Total: ₡${"%.2f".format(pedido.total)}")
                        if (rol == "REPARTIDOR") {
                            when (pedido.estado) {
                                "EN_PREPARACION" -> {
                                    Spacer(modifier = Modifier.height(8.dp))
                                    Button(
                                        onClick = {
                                            val pedidoActualizado = pedido.copy(estado = "EN_CAMINO")
                                            scope.launch {
                                                PedidoRepository.updatePedido(pedidoActualizado)
                                            }
                                            Toast.makeText(context, "Pedido marcado como en camino", Toast.LENGTH_SHORT).show()
                                            pedidos = pedidos.map {
                                                if (it.id == pedido.id) pedidoActualizado else it
                                            }
                                        },
                                        modifier = Modifier.align(Alignment.End)
                                    ) {
                                        Text("Marcar como en camino")
                                    }
                                }
                                "EN_CAMINO" -> {
                                    Spacer(modifier = Modifier.height(8.dp))
                                    Button(
                                        onClick = {
                                            val pedidoActualizado = pedido.copy(estado = "ENTREGADO", fechaEntrega = LocalDate.now())
                                            repartidor?.estado = "DISPONIBLE"
                                            scope.launch {
                                                PedidoRepository.updatePedido(pedidoActualizado)
                                                RepartidorRepository.updateRepartidor(repartidor!!)
                                            }
                                            Toast.makeText(context, "Pedido marcado como entregado", Toast.LENGTH_SHORT).show()
                                            pedidos = pedidos.map {
                                                if (it.id == pedido.id) pedidoActualizado else it
                                            }
                                        },
                                        modifier = Modifier.align(Alignment.End)
                                    ) {
                                        Text("Marcar como entregado")
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}