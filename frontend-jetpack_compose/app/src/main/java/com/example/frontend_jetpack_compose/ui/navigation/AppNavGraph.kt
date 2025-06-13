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

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun AppNavGraph(navController: NavHostController) {
    val loginViewModel: LoginViewModel = viewModel()
    val isLoggedIn by loginViewModel.isLoggedIn.collectAsState()

    NavHost(
        navController = navController,
        startDestination = /*if (isLoggedIn) "lista_restaurantes" else*/ "login"
    ) {
        composable("login") {
            LoginScreen(
                navController = navController,
                viewModel = loginViewModel
            )
        }

        if (isLoggedIn) {
//            composable("registro_cliente") {
//                RegistroClienteScreen(navController = navController)
//            }
//
//            composable("lista_restaurantes") {
//                ListaRestaurantesScreen(navController = navController)
//            }
//
//            composable("detalle_restaurante/{restauranteId}") { backStackEntry ->
//                val restauranteId = backStackEntry.arguments?.getString("restauranteId") ?: ""
//                DetalleRestauranteScreen(navController = navController, restauranteId = restauranteId)
//            }
//
//            composable("carrito") { CarritoScreen(navController = navController) }
//
//            composable("seguimiento/{pedidoId}") { backStackEntry ->
//                val pedidoId = backStackEntry.arguments?.getString("pedidoId")?.toIntOrNull() ?: 0
//                SeguimientoPedidoScreen(navController = navController, pedidoId = pedidoId)
//            }
//
//            composable("historial") { HistorialPedidosScreen(navController = navController) }
        }
    }
}
