package com.example.frontend_jetpack_compose.ui.screens

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.Card
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.frontend_jetpack_compose.data.model.Restaurante
import com.example.frontend_jetpack_compose.data.repository.RestauranteRepository

@Composable
fun ListaRestaurantesScreen(navController: NavController) {
    val restaurantes by remember { mutableStateOf(RestauranteRepository.obtenerTodos()) }
    var selectedType by remember { mutableStateOf("Todas") }

    Column(modifier = Modifier.fillMaxSize()) {
        // Filtro por tipo de comida
        val tipos = listOf("Todas") + restaurantes.map { it.tipoComida }.distinct()
        Row(
            modifier = Modifier.horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            tipos.forEach { tipo ->
                FilterChip(
                    selected = (tipo == selectedType),
                    onClick = { selectedType = tipo },
                    label = { Text(tipo) }
                )
            }
        }

        // Lista de restaurantes
        LazyColumn(modifier = Modifier.fillMaxWidth()) {
            val filteredRestaurantes = restaurantes.filter {
                selectedType == "Todas" || it.tipoComida == selectedType
            }
            items(count = filteredRestaurantes.size) { index ->
                val restaurante = filteredRestaurantes[index]
                RestaurantCard(
                    restaurante = restaurante,
                    onClick = { navController.navigate("detalle_restaurante/${restaurante.cedulaJuridica}") }
                )
            }
        }
    }
}

@Composable
fun RestaurantCard(restaurante: Restaurante, onClick: () -> Unit) {
    Card(
        onClick = onClick,
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(restaurante.nombre, style = MaterialTheme.typography.headlineSmall)
            Text("Tipo: ${restaurante.tipoComida}", style = MaterialTheme.typography.bodyMedium)
        }
    }
}