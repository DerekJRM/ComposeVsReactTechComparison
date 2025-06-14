package com.example.frontend_jetpack_compose.ui.screens

import android.os.Build
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Payment
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableDoubleStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment.Companion.CenterVertically
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.frontend_jetpack_compose.data.LoginViewModel
import com.example.frontend_jetpack_compose.data.model.Cliente
import com.example.frontend_jetpack_compose.data.model.Combo
import com.example.frontend_jetpack_compose.data.model.Pedido
import com.example.frontend_jetpack_compose.data.model.PedidoCombo
import com.example.frontend_jetpack_compose.data.repository.ComboRepository
import com.example.frontend_jetpack_compose.data.repository.PedidoRepository
import com.example.frontend_jetpack_compose.data.repository.RepartidorRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.time.Instant

data class CarritoItem(
    val combo: Combo,
    val cantidad: Int,
    val distanciaKm: Double,
    val esFeriado: Boolean,
    val costoTransporte: Double,
    val subtotal: Double,
    val iva: Double,
    val total: Double
)

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun CombosScreen(
    navController: NavController,
    restauranteId: String,
    rol: String,
    cliente: Cliente? = null
) {
    var selectedCombo by remember { mutableStateOf<Combo?>(null) }
    var cantidad by remember { mutableIntStateOf(1) }
    var distanciaKm by remember { mutableDoubleStateOf(0.0) }
    var esFeriado by remember { mutableStateOf(false) }
    var cantidadEditar by remember { mutableIntStateOf(1) }
    val precioUnitario = selectedCombo?.precio ?: 0.0
    val subtotal = cantidad * precioUnitario
    val costoPorKm = if (esFeriado) 1500 else 1000
    val costoTransporte = distanciaKm * costoPorKm
    val iva = subtotal * 0.13
    val total = subtotal + costoTransporte + iva
    var carrito by remember(restauranteId) { mutableStateOf(listOf<CarritoItem>()) }
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var combos by remember { mutableStateOf<List<Combo>>(emptyList()) }
    var showDialog by remember { mutableStateOf(false) }
    var editingCombo by remember { mutableStateOf<Combo?>(null) }
    var comboNum by remember { mutableStateOf(TextFieldValue("")) }
    var precio by remember { mutableStateOf(TextFieldValue("")) }
    var descripcion by remember { mutableStateOf(TextFieldValue("")) }
    var comboAEliminar by remember { mutableStateOf<Combo?>(null) }
    var esEdicion by remember { mutableStateOf(false) }

    // Load combos on start
    LaunchedEffect(restauranteId) {
        combos = withContext(Dispatchers.IO) {
            ComboRepository.getCombosByRestaurante(restauranteId) ?: emptyList()
        }
    }

    fun openDialog(combo: Combo?) {
        editingCombo = combo
        comboNum = TextFieldValue(combo?.comboNum?.toString() ?: "")
        precio = TextFieldValue(combo?.precio?.toString() ?: "")
        descripcion = TextFieldValue(combo?.descripcion ?: "")
        showDialog = true
    }

    fun resetDialog() {
        showDialog = false
        editingCombo = null
        comboNum = TextFieldValue("")
        precio = TextFieldValue("")
        descripcion = TextFieldValue("")
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
        ) {
            Text(
                text = "Combos",
                style = MaterialTheme.typography.headlineSmall,
            )

            if (rol != "RESTAURANTE") {
                Button(
                    onClick = { navController.popBackStack() },
                    modifier = Modifier
                        .padding(start = 8.dp)
                        .height(40.dp)
                ) {
                    Text(
                        text = "Regresar",
                        fontSize = 16.sp
                    )
                }

            }
        }

        LazyColumn(modifier = Modifier.weight(1f)) {
            items(combos, key = { it.id ?: 0 }) { combo ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp)
                        .let {
                            if (rol != "RESTAURANTE")
                                it.clickable {
                                    selectedCombo = combo
                                    cantidad = 1
                                    distanciaKm = (5..30).random() / 10.0 // entre 0.5 y 3.0 km
                                    esFeriado = listOf(true, false).random()
                                }
                            else it
                        },
                    elevation = CardDefaults.cardElevation(6.dp)
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Text("Combo #${combo.comboNum}", style = MaterialTheme.typography.titleMedium)
                        Text("Precio: ₡${String.format("%.2f", combo.precio)}", style = MaterialTheme.typography.bodyMedium)
                        Text("Descripción: ${combo.descripcion}", style = MaterialTheme.typography.bodyMedium)

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(top = 8.dp),
                            horizontalArrangement = Arrangement.End
                        ) {
                            if (rol == "RESTAURANTE") {
                                IconButton(onClick = { openDialog(combo) }) {
                                    Icon(Icons.Default.Edit, contentDescription = "Editar combo")
                                }
                                IconButton(onClick = {
                                    scope.launch {
                                        withContext(Dispatchers.IO) {
                                            ComboRepository.deleteCombo(combo.id!!)
                                            combos = ComboRepository.getCombosByRestaurante(restauranteId) as List<Combo>
                                        }
                                        Toast.makeText(context, "Combo eliminado", Toast.LENGTH_SHORT).show()
                                    }
                                }) {
                                    Icon(Icons.Default.Delete, contentDescription = "Eliminar combo")
                                }
                            }
                        }
                    }
                }
            }
        }

        if (rol != "RESTAURANTE" && carrito.isNotEmpty()) {
            Spacer(modifier = Modifier.height(12.dp))
            Text("🛒 Carrito (${carrito.size} items)", style = MaterialTheme.typography.titleMedium)
            val carritoAgrupado = carrito
                .groupBy { it.combo.id }
                .map { (comboId, items) ->
                    val combo = items.first().combo
                    val cantidadTotal = items.sumOf { it.cantidad }
                    val total = items.sumOf { it.total }
                    Triple(combo, cantidadTotal, total)
                }
            LazyColumn {
                items(carritoAgrupado, key = { it.first.id ?: it.hashCode() }) { (combo, cantidad, total) ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        elevation = CardDefaults.cardElevation(4.dp)
                    ) {
                        Row(
                            modifier = Modifier
                                .padding(8.dp)
                                .fillMaxWidth()
                                .clickable {
                                    selectedCombo = combo
                                    cantidadEditar = cantidad
                                    esEdicion = true
                                },
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = CenterVertically
                        ) {
                            Column {
                                Text("Combo #${combo.comboNum} x$cantidad")
                                Text("₡${"%.2f".format(total)}", fontSize = 14.sp)
                            }
                            IconButton(onClick = {
                                comboAEliminar = combo // Abrimos diálogo para confirmar
                            }) {
                                Icon(Icons.Default.Delete, contentDescription = "Eliminar del carrito")
                            }
                        }
                    }
                }
            }

            val totalFinal = carrito.sumOf { it.total }
            Spacer(modifier = Modifier.height(8.dp))
            Text("Total final: ₡${"%.2f".format(totalFinal)}", fontSize = 18.sp)

            Spacer(modifier = Modifier.height(12.dp))

            Button(
                onClick = {
                    scope.launch {
                        withContext(Dispatchers.IO) {
                            val repartidor = RepartidorRepository.getAllRepartidores().find { it -> it.estado == "DISPONIBLE" }
                            if (repartidor == null) {
                                Toast.makeText(context, "No hay repartidores disponibles", Toast.LENGTH_SHORT).show()
                                return@withContext
                            }
                            val nuevoPedido = PedidoRepository.createPedido(
                                Pedido(
                                    clienteId = cliente?.cedula ?: "",
                                    restauranteId = restauranteId,
                                    repartidorId = repartidor.cedula,
                                    estado = "EN_PREPARACION",
                                    fechaPedido = Instant.now(),
                                    subtotal = totalFinal,
                                    costoTransporte = carrito.sumOf { it.costoTransporte },
                                    iva = carrito.sumOf { it.iva },
                                    total = totalFinal,
                                    newItem = true
                                )
                            )

                            // Agregar combos al pedido
                            carrito.forEach { item ->
                                PedidoRepository.addComboToPedido(PedidoCombo(
                                    pedidoId = nuevoPedido?.id ?: 0L,
                                    comboId = item.combo.id ?: 0L,
                                    cantidad = item.cantidad.toShort(),
                                    precioUnit = item.combo.precio,
                                    newItem = true
                                ))
                            }
                        }
                    }

                    Toast.makeText(context, "Pedido realizado con éxito", Toast.LENGTH_SHORT).show()
                    carrito = emptyList()
                },
                modifier = Modifier.fillMaxWidth().height(56.dp)
            ) {
                Icon(Icons.Default.Payment, contentDescription = "Pagar")
                Spacer(Modifier.width(8.dp))
                Text("Realizar Pedido", style = MaterialTheme.typography.titleMedium)
            }
        }

        if (rol == "RESTAURANTE") {
            Spacer(modifier = Modifier.height(12.dp))
            Button(
                onClick = {
                    selectedCombo = null
                    esEdicion = false
                    openDialog(null)
                },
                modifier = Modifier.fillMaxWidth().height(56.dp)
            ) {
                Icon(Icons.Default.Add, contentDescription = "Agregar combo")
                Spacer(Modifier.width(8.dp))
                Text("Agregar Combo", style = MaterialTheme.typography.titleMedium)
            }
        }
    }

    if (selectedCombo != null) {
        val combo = selectedCombo!!

        AlertDialog(
            onDismissRequest = {
                selectedCombo = null
                esEdicion = false
            },
            title = {
                Text(if (esEdicion) "Editar Combo del Carrito" else "Agregar Combo al Carrito")
            },
            text = {
                Column {
                    Text("Combo #${combo.comboNum}")
                    Text("Descripción: ${combo.descripcion}")
                    Text("Precio unitario: ₡${"%.2f".format(precioUnitario)}")

                    Spacer(modifier = Modifier.height(8.dp))
                    Row(verticalAlignment = CenterVertically) {
                        Button(onClick = {
                            if (cantidad > 1) {
                                cantidad--
                            } else if (cantidad == 1 && esEdicion) {
                                comboAEliminar = selectedCombo
                                selectedCombo = null
                                esEdicion = false
                            }
                        }) {
                            Text("-")
                        }
                        Spacer(Modifier.width(16.dp))
                        Text(cantidad.toString(), fontSize = 18.sp)
                        Spacer(Modifier.width(16.dp))
                        Button(onClick = { cantidad++ }) { Text("+") }
                    }

                    Spacer(modifier = Modifier.height(12.dp))
                    Text("Distancia: ${"%.1f".format(distanciaKm)} km")
                    Text("Costo transporte: ₡${"%.2f".format(costoTransporte)}")
                    Text("Subtotal: ₡${"%.2f".format(subtotal)}")
                    Text("IVA (13%): ₡${"%.2f".format(iva)}")
                    Text("Total: ₡${"%.2f".format(total)}")
                }
            },
            confirmButton = {
                TextButton(onClick = {
                    if (esEdicion) {
                        // Elimina ítems del combo anterior
                        carrito = carrito.filterNot { it.combo.id == combo.id }
                    }
                    carrito = carrito + CarritoItem(
                        combo = combo,
                        cantidad = cantidad,
                        distanciaKm = distanciaKm,
                        esFeriado = esFeriado,
                        costoTransporte = costoTransporte,
                        subtotal = subtotal,
                        iva = iva,
                        total = total
                    )
                    selectedCombo = null
                    esEdicion = false
                }) {
                    Text(if (esEdicion) "Actualizar" else "Agregar")
                }
            },
            dismissButton = {
                TextButton(onClick = {
                    selectedCombo = null
                    esEdicion = false
                }) {
                    Text("Cancelar")
                }
            }
        )
    }

    if (comboAEliminar != null) {
        AlertDialog(
            onDismissRequest = { comboAEliminar = null },
            title = { Text("Confirmar eliminación") },
            text = { Text("¿Deseas eliminar el combo #${comboAEliminar!!.comboNum} del carrito?") },
            confirmButton = {
                TextButton(onClick = {
                    carrito = carrito.filterNot { it.combo.id == comboAEliminar!!.id }
                    comboAEliminar = null
                }) {
                    Text("Eliminar")
                }
            },
            dismissButton = {
                TextButton(onClick = {
                    cantidad = 1
                    comboAEliminar = null
                }) {
                    Text("Cancelar")
                }
            }
        )
    }

    if (showDialog) {
        AlertDialog(
            onDismissRequest = { resetDialog() },
            title = { Text(if (editingCombo == null) "Agregar Combo" else "Editar Combo") },
            text = {
                Column {
                    OutlinedTextField(
                        value = comboNum,
                        onValueChange = { newValue ->
                            // Filtramos solo dígitos
                            val filtered = newValue.text.filter { it.isDigit() }
                            // Reconstruimos el TextFieldValue con el texto filtrado
                            comboNum = newValue.copy(text = filtered)
                        },
                        label = { Text("Número de Combo") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(Modifier.height(8.dp))
                    OutlinedTextField(
                        value = precio,
                        onValueChange = { newValue ->
                            // Permitimos dígitos y punto
                            val filtered = newValue.text.filter { it.isDigit() || it == '.' }
                            // Opcional: evitar más de un punto
                            val normalized = if (filtered.count { it == '.' } > 1)
                                filtered.dropLast(1)
                            else
                                filtered
                            precio = newValue.copy(text = normalized)
                        },
                        label = { Text("Precio") },
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(Modifier.height(8.dp))
                    OutlinedTextField(
                        value = descripcion,
                        onValueChange = { descripcion = it },
                        label = { Text("Descripción") },
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                TextButton(onClick = {
                    val num = comboNum.text.toShortOrNull()
                    val pr = precio.text.toDoubleOrNull()
                    if (num == null || pr == null || descripcion.text.isBlank()) {
                        Toast.makeText(context, "Complete todos los campos", Toast.LENGTH_LONG).show()
                        return@TextButton
                    }
                    val combo = Combo(
                        id = editingCombo?.id,
                        restauranteId = restauranteId,
                        comboNum = num,
                        precio = pr,
                        descripcion = descripcion.text,
                        newItem = editingCombo == null
                    )
                    scope.launch {
                        withContext(Dispatchers.IO) {
                            if (editingCombo == null) ComboRepository.createCombo(combo)
                            else ComboRepository.updateCombo(combo)
                            combos = ComboRepository.getCombosByRestaurante(restauranteId) as List<Combo>
                        }
                        Toast.makeText(context,
                            if (editingCombo == null) "Combo agregado" else "Combo actualizado",
                            Toast.LENGTH_SHORT).show()
                        resetDialog()
                    }
                }) {
                    Text("Guardar")
                }
            },
            dismissButton = {
                TextButton(onClick = { resetDialog() }) { Text("Cancelar") }
            }
        )
    }

}
