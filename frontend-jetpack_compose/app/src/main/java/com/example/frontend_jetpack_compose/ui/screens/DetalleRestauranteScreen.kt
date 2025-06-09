package com.example.frontend_jetpack_compose.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.frontend_jetpack_compose.data.model.DetallePedido
import com.example.frontend_jetpack_compose.data.repository.ComboRepository
import com.example.frontend_jetpack_compose.data.repository.DetallePedidoRepository
import com.example.frontend_jetpack_compose.data.repository.RestauranteRepository

@Composable
fun DetalleRestauranteScreen(
    navController: NavController,
    restauranteId: String
) {
    val restaurante = RestauranteRepository.obtenerPorId(restauranteId)
    val combos = ComboRepository.obtenerCombosPorRestaurante(restauranteId)
    val selectedCombos = remember { mutableStateMapOf<Int, Int>() } // Combo ID to Quantity

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(
            text = restaurante?.nombre ?: "Restaurante no encontrado",
            style = MaterialTheme.typography.headlineMedium
        )

        Spacer(modifier = Modifier.height(16.dp))

        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(count = combos.size) { index ->
                val combo = combos[index]
                Card(
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier.padding(8.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "Combo ${combo.numeroCombo}",
                            style = MaterialTheme.typography.titleLarge
                        )

                        Text(
                            text = "₡${4000 + (combo.numeroCombo - 1) * 1000}",
                            color = MaterialTheme.colorScheme.primary
                        )

                        QuantitySelector(
                            quantity = selectedCombos[combo.id] ?: 0,
                            onQuantityChange = { newQty ->
                                if (newQty > 0) {
                                    selectedCombos[combo.id as Int] = newQty
                                } else {
                                    selectedCombos.remove(combo.id)
                                }
                            }
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.weight(1f))

        Button(
            onClick = {
                // Guardar detalles temporalmente
                selectedCombos.forEach { (comboId, qty) ->
                    DetallePedidoRepository.agregarDetalle(
                        DetallePedido(
                            pedidoId = -1, // Temporal hasta crear el pedido
                            comboId = comboId,
                            cantidad = qty
                        )
                    )
                }
                navController.navigate("carrito")
            },
            modifier = Modifier.fillMaxWidth(),
            enabled = selectedCombos.isNotEmpty()
        ) {
            Text("Ver Carrito (${selectedCombos.values.sum()})")
        }
    }
}

@Composable
fun QuantitySelector(
    quantity: Int,
    onQuantityChange: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically
    ) {
        IconButton(
            onClick = { onQuantityChange(quantity - 1) },
            enabled = quantity > 0
        ) {
            Icon(Icons.Default.Delete, contentDescription = "Reducir")
        }

        Text(
            text = "$quantity",
            modifier = Modifier.padding(horizontal = 8.dp)
        )

        IconButton(
            onClick = { onQuantityChange(quantity + 1) }
        ) {
            Icon(Icons.Default.Add, contentDescription = "Aumentar")
        }
    }
}