package com.example.frontend_jetpack_compose.ui.navigation

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.frontend_jetpack_compose.ui.screens.*
import com.example.frontend_jetpack_compose.ui.viewmodels.LoginViewModel

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun AppNavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = "login"
    ) {
        // Pantallas principales
        composable("login") {
            val viewModel: LoginViewModel = viewModel()
            LoginScreen(
                navController = navController,
                viewModel = viewModel
            )
        }

        composable("registro_cliente") {
            RegistroClienteScreen(navController = navController)
        }

        composable("lista_restaurantes") {
            ListaRestaurantesScreen(navController = navController)
        }

        composable("detalle_restaurante/{restauranteId}") { backStackEntry ->
            val restauranteId = backStackEntry.arguments?.getString("restauranteId") ?: ""
            DetalleRestauranteScreen(
                navController = navController,
                restauranteId = restauranteId
            )
        }

        composable("carrito") { CarritoScreen(navController = navController) }

        composable("seguimiento/{pedidoId}") { backStackEntry ->
            val pedidoId = backStackEntry.arguments?.getString("pedidoId")?.toIntOrNull() ?: 0
            SeguimientoPedidoScreen(navController = navController, pedidoId = pedidoId)
        }

        composable("historial") { HistorialPedidosScreen(navController = navController) }
    }
}