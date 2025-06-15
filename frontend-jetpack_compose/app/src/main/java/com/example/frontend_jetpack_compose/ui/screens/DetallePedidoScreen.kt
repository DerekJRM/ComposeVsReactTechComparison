package com.example.frontend_jetpack_compose.ui.screens

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Receipt
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavBackStackEntry
import androidx.navigation.NavHostController
import com.example.frontend_jetpack_compose.data.model.Cliente
import com.example.frontend_jetpack_compose.data.model.Combo
import com.example.frontend_jetpack_compose.data.model.Pedido
import com.example.frontend_jetpack_compose.data.model.Queja
import com.example.frontend_jetpack_compose.data.model.Repartidor
import com.example.frontend_jetpack_compose.data.model.Restaurante
import com.example.frontend_jetpack_compose.data.repository.ClienteRepository
import com.example.frontend_jetpack_compose.data.repository.ComboRepository
import com.example.frontend_jetpack_compose.data.repository.PedidoRepository
import com.example.frontend_jetpack_compose.data.repository.QuejaRepository
import com.example.frontend_jetpack_compose.data.repository.RepartidorRepository
import com.example.frontend_jetpack_compose.data.repository.RestauranteRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun DetallePedidoScreen(
    navController: NavHostController,
    pedidoId: Long,
    rol: String
) {
    val context = LocalContext.current
    var pedido by remember { mutableStateOf<Pedido?>(null) }
    var combos by remember { mutableStateOf<List<Triple<Combo, Int, Double>>>(emptyList()) }

    LaunchedEffect(pedidoId) {
        pedido = PedidoRepository.getPedidoById(pedidoId)
        val detalles = PedidoRepository.getCombosByPedido(pedidoId)
        val agrupado = detalles.groupBy { it.comboId }.mapNotNull { (comboId, items) ->
            val combo = ComboRepository.getComboById(comboId) ?: return@mapNotNull null
            val cantidadTotal = items.sumOf { it.cantidad.toInt() }
            val total = items.sumOf { it.precioUnit * it.cantidad }
            Triple(combo, cantidadTotal, total)
        }
        combos = agrupado
    }

    Column(modifier = Modifier.padding(16.dp)) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Detalle del Pedido",
                style = MaterialTheme.typography.headlineSmall
            )
            Button(
                onClick = { navController.popBackStack() },
                modifier = Modifier.height(40.dp)
            ) {
                Text("Regresar", fontSize = 16.sp)
            }
        }
        Spacer(modifier = Modifier.height(12.dp))

        pedido?.let { p ->
            var restaurante by remember { mutableStateOf<Restaurante?>(null) }
            var repartidor by remember { mutableStateOf<Repartidor?>(null) }
            var cliente by remember { mutableStateOf<Cliente?>(null) }

            LaunchedEffect(p.restauranteId) {
                restaurante = RestauranteRepository.getRestauranteById(p.restauranteId)
            }
            LaunchedEffect(p.repartidorId) {
                repartidor = RepartidorRepository.getRepartidorById(p.repartidorId)
            }
            LaunchedEffect(p.clienteId) {
                cliente = ClienteRepository.getClienteById(p.clienteId)
            }

            Text("Pedido #${p.id}", fontWeight = FontWeight.Bold)
            Text("Fecha: ${p.fechaPedido}")
            Text("Restaurante: ${restaurante?.nombre ?: "Desconocido"}")

            if (rol == "CLIENTE") {
                Text("Repartidor: ${repartidor?.nombre ?: "Desconocido"}")
            } else {
                Text("Cliente: ${cliente?.nombre ?: "Desconocido"}")
            }

            Text("Estado: ${p.estado}")

            Spacer(modifier = Modifier.height(8.dp))

            Text("Subtotal: ₡${"%.2f".format(p.subtotal)}")
            Text("Costo de Transporte: ₡${"%.2f".format(p.costoTransporte)}")
            Text("IVA (13%): ₡${"%.2f".format(p.iva)}")
            Text("Total: ₡${"%.2f".format(p.total)}", fontSize = 18.sp, fontWeight = FontWeight.Medium)

            Spacer(modifier = Modifier.height(16.dp))

            var calificacion by remember { mutableIntStateOf(0) }
            var yaCalificado by remember { mutableStateOf(false) }

            LaunchedEffect(p.id) {
                val queja = withContext(Dispatchers.IO) {
                    QuejaRepository.getQuejasByPedido(p.id!!) // retorna Queja? o null
                }

                queja?.let {
                    val valor = it.descripcion.toIntOrNull()
                    if (valor != null && valor in 1..5) {
                        calificacion = valor
                        yaCalificado = true
                    }
                }
            }

            if (rol == "CLIENTE" && p.estado == "ENTREGADO") {
                Spacer(modifier = Modifier.height(16.dp))
                Text("Califica tu pedido", fontWeight = FontWeight.SemiBold)

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(vertical = 8.dp)
                ) {
                    (1..5).forEach { index ->
                        IconToggleButton(
                            checked = index <= calificacion,
                            onCheckedChange = {
                                if (!yaCalificado) {
                                    calificacion = index
                                }
                            },
                            enabled = !yaCalificado
                        ) {
                            Icon(
                                imageVector = Icons.Default.Star,
                                contentDescription = "Estrella $index",
                                tint = if (index <= calificacion)
                                    MaterialTheme.colorScheme.primary
                                else
                                    MaterialTheme.colorScheme.onSurface.copy(alpha = 0.4f)
                            )
                        }
                    }
                }

                val scope = rememberCoroutineScope()

                Button(
                    onClick = {
                        if (!yaCalificado) {
                            val queja = Queja(
                                repartidorId = p.repartidorId,
                                clienteId = p.clienteId,
                                pedidoId = p.id ?: 0L,
                                descripcion = (calificacion.coerceIn(0, 5)).toString(),
                                fechaQueja = p.fechaEntrega ?: p.fechaPedido,
                                id = null,
                                newItem = false
                            )

                            scope.launch {
                                withContext(Dispatchers.IO) {
                                    QuejaRepository.createQueja(queja)
                                    if (calificacion < 3) {
                                        repartidor?.amonestaciones += 1
                                        repartidor?.amonestaciones?.let {
                                            if (it >= 4) {
                                                repartidor?.estado = "INACTIVO"
                                            }
                                        }
                                        RepartidorRepository.updateRepartidor(repartidor ?: return@withContext)
                                    }
                                }
                                yaCalificado = true
                            }
                        }
                    },
                    enabled = !yaCalificado,
                    modifier = Modifier.align(Alignment.End)
                ) {
                    Text(if (yaCalificado) "Calificación enviada" else "Enviar calificación")
                }

            }

            Text("Combos incluidos", style = MaterialTheme.typography.titleMedium)

            Spacer(modifier = Modifier.height(8.dp))

            LazyColumn {
                items(combos, key = { it.first.id ?: it.hashCode() }) { (combo, cantidad, total) ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        elevation = CardDefaults.cardElevation(4.dp)
                    ) {
                        Row(
                            modifier = Modifier
                                .padding(8.dp)
                                .fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text("Combo #${combo.comboNum} x$cantidad")
                                Text("₡${"%.2f".format(total)}", fontSize = 14.sp)
                                Text("Descripción: ${combo.descripcion}", fontSize = 12.sp)
                            }
                        }
                    }
                }
            }
        } ?: run {
            Text("Cargando detalles del pedido...")
        }
    }
}
