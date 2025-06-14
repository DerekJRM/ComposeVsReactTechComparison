package com.example.frontend_jetpack_compose.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.frontend_jetpack_compose.data.model.Restaurante
import com.example.frontend_jetpack_compose.data.repository.RestauranteRepository
import kotlinx.coroutines.launch
import androidx.compose.material3.TopAppBarDefaults
import androidx.navigation.NavController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RestaurantesScreen(
    navController: NavController,
    rol: String
) {
    val coroutineScope = rememberCoroutineScope()
    var restaurantes by remember { mutableStateOf(listOf<Restaurante>()) }

    // Simula carga inicial desde el repositorio
    LaunchedEffect(Unit) {
        coroutineScope.launch {
            restaurantes = RestauranteRepository.getAllRestaurantes() // Debes tener esta función
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Restaurantes",
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.padding(bottom = 12.dp)
        )

        LazyColumn(modifier = Modifier.weight(1f)) {
            items(restaurantes, key = { it.cedulaJuridica }) { restaurante ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp)
                        .let {
                            it.clickable {
                                navController.navigate("combos/${restaurante.cedulaJuridica}/$rol")
                            }
                        },
                    elevation = CardDefaults.cardElevation(6.dp)
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Text("Nombre: ${restaurante.nombre}", style = MaterialTheme.typography.titleMedium)
                        Text("Dirección: ${restaurante.direccion}", style = MaterialTheme.typography.bodyMedium)
                        Text("Tipo de comida: ${restaurante.tipoComida}", style = MaterialTheme.typography.bodyMedium)
                    }
                }
            }

            if (restaurantes.isEmpty()) {
                item {
                    Text(
                        "No hay restaurantes disponibles",
                        modifier = Modifier.fillMaxWidth(),
                        textAlign = TextAlign.Center,
                        style = MaterialTheme.typography.bodyLarge
                    )
                }
            }
        }
    }
}