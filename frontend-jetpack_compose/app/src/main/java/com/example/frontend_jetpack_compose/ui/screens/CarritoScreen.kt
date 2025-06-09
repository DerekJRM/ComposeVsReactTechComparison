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
import androidx.compose.material3.Button
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.frontend_jetpack_compose.data.model.Pedido
import com.example.frontend_jetpack_compose.data.repository.ComboRepository
import com.example.frontend_jetpack_compose.data.repository.DetallePedidoRepository
import com.example.frontend_jetpack_compose.data.repository.PedidoRepository
import java.time.LocalDateTime

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun CarritoScreen(navController: NavController) {
    val pedidoTemporal = remember {
        Pedido(
            clienteCedula = "current_user", // Temporal hasta implementar autenticación
            restauranteCedulaJuridica = "current_restaurant", // Temporal
            estado = "PREPARACION",
            fechaHora = LocalDateTime.now(),
            subtotal = 0.0,
            costoTransporte = 0.0,
            iva = 0.0,
            total = 0.0,
            distancia = 5.0 // Valor temporal
        )
    }

    val pedidoFinal = PedidoRepository.crearPedido(pedidoTemporal)

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("Resumen del Pedido", style = MaterialTheme.typography.headlineMedium)

        Spacer(modifier = Modifier.height(16.dp))

        // Detalles de combos
        DetallePedidoRepository.obtenerPorPedido(pedidoFinal.id ?: 0).forEach { detalle ->
            val combo = ComboRepository.obtenerCombo(detalle.comboId)
            val precio = 4000.0 + ((combo?.numeroCombo ?: 1) - 1) * 1000.0

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Combo ${combo?.numeroCombo}")
                Text("₡${precio * detalle.cantidad}")
            }
        }

        Divider(modifier = Modifier.padding(vertical = 8.dp))

        // Totales
        TotalRow("Subtotal", pedidoFinal.subtotal)
        TotalRow("Transporte", pedidoFinal.costoTransporte)
        TotalRow("IVA (13%)", pedidoFinal.iva)
        TotalRow("Total", pedidoFinal.total, isTotal = true)

        Spacer(modifier = Modifier.weight(1f))

        Button(
            onClick = { navController.navigate("seguimiento/${pedidoFinal.id}") },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Confirmar Pedido")
        }
    }
}

@Composable
fun TotalRow(label: String, amount: Double, isTotal: Boolean = false) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = label,
            style = if (isTotal) MaterialTheme.typography.titleLarge else MaterialTheme.typography.bodyMedium
        )
        Text(
            text = "₡${"%.2f".format(amount)}",
            style = if (isTotal) MaterialTheme.typography.titleLarge else MaterialTheme.typography.bodyMedium
        )
    }
}