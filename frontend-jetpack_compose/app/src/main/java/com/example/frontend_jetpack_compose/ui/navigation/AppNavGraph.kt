package com.example.frontend_jetpack_compose.ui.navigation

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.frontend_jetpack_compose.ui.screens.*
import com.example.frontend_jetpack_compose.data.LoginViewModel
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.navigation.NavType
import androidx.navigation.navArgument

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun AppNavGraph(navController: NavHostController) {
    val loginViewModel: LoginViewModel = viewModel()
    val isLoggedIn by loginViewModel.isLoggedIn.collectAsState()
    val rol by loginViewModel.rol.collectAsState()
    val cliente by loginViewModel.cliente.collectAsState()
    val repartidor by loginViewModel.repartidor.collectAsState()
    val restaurante by loginViewModel.restaurante.collectAsState()

    NavHost(
        navController = navController,
        startDestination = if (isLoggedIn) {
            when (rol) {
                "CLIENTE" -> "restaurantes/${rol.toString()}"
                "RESTAURANTE" -> "combos/${restaurante?.cedulaJuridica ?: ""}/${rol.toString()}"
                else -> "pedidos/${rol.toString()}"
            }
        } else {
            "login"
        }
    ) {
        composable("login") {
            LoginScreen(
                navController = navController,
                viewModel = loginViewModel
            )
        }

        composable("registro") {
            RegistroScreen(
                navController = navController
            )
        }

        composable("perfil") {
            PerfilScreen(
                rol = rol.toString(),
                cliente = cliente,
                repartidor = repartidor,
                restaurante = restaurante
            )
        }

        composable(
            "combos/{restauranteId}/{rol}",
            arguments = listOf(
                navArgument("restauranteId") { type = NavType.StringType },
                navArgument("rol") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val restauranteId = backStackEntry.arguments?.getString("restauranteId") ?: ""
            val rol = backStackEntry.arguments?.getString("rol") ?: ""
            CombosScreen(
                navController = navController,
                restauranteId = restauranteId,
                rol = rol,
                cliente = cliente,
            )
        }

        composable(
            "restaurantes/{rol}",
            arguments = listOf(navArgument("rol") { type = NavType.StringType })
        ) { backStackEntry ->
            val rol = backStackEntry.arguments?.getString("rol") ?: ""
            RestaurantesScreen(
                navController = navController,
                rol = rol
            )
        }

        composable(
            "pedidos/{rol}",
            arguments = listOf(navArgument("rol") { type = NavType.StringType })
        ) { backStackEntry ->
            val rol = backStackEntry.arguments?.getString("rol") ?: ""
            PedidosScreen(
                navController = navController,
                cliente = cliente,
                repartidor = repartidor,
                rol = rol
            )
        }

        composable(
            "detalle_pedido/{pedidoId}/{rol}",
            arguments = listOf(
                navArgument("pedidoId") { type = NavType.LongType },
                navArgument("rol") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val pedidoId = backStackEntry.arguments?.getLong("pedidoId") ?: 0L
            val rol = backStackEntry.arguments?.getString("rol") ?: ""
            DetallePedidoScreen(
                navController = navController,
                pedidoId = pedidoId,
                rol = rol.toString(),
            )
        }

    }
}
