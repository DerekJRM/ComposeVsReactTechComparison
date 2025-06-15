package com.example.frontend_jetpack_compose.ui.components

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.Divider
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.NavigationDrawerItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.example.frontend_jetpack_compose.data.LoginViewModel
import com.example.frontend_jetpack_compose.ui.navigation.AppNavGraph
import kotlinx.coroutines.launch

@RequiresApi(Build.VERSION_CODES.O)
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScaffold(navController: NavHostController) {
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    val loginViewModel: LoginViewModel = viewModel()
    val isLoggedIn by loginViewModel.isLoggedIn.collectAsState()
    val rol by loginViewModel.rol.collectAsState()
    val restaurante by loginViewModel.restaurante.collectAsState()

    if (isLoggedIn) {
        ModalNavigationDrawer(
            drawerState = drawerState,
            drawerContent = {
                ModalDrawerSheet {
                    Text("CletaEats", style = MaterialTheme.typography.headlineSmall, modifier = Modifier.padding(16.dp))
                    Divider()
                    NavigationDrawerItem(
                        label = { Text("Perfil") },
                        selected = false,
                        onClick = {
                            scope.launch { drawerState.close() }
                            navController.navigate("perfil")
                        }
                    )
                    if (rol == "RESTAURANTE") {
                        NavigationDrawerItem(
                            label = { Text("Combos") },
                            selected = false,
                            onClick = {
                                scope.launch { drawerState.close() }
                                val id = restaurante?.cedulaJuridica ?: ""
                                val rolStr = rol.toString()
                                navController.navigate("combos/$id/$rolStr")
                            }
                        )
                    }
                    if (rol == "CLIENTE") {
                        NavigationDrawerItem(
                            label = { Text("Restaurantes") },
                            selected = false,
                            onClick = {
                                scope.launch { drawerState.close() }
                                val rolStr = rol.toString()
                                navController.navigate("restaurantes/$rolStr")
                            }
                        )
                        NavigationDrawerItem(
                            label = { Text("Mis Pedidos") },
                            selected = false,
                            onClick = {
                                scope.launch { drawerState.close() }
                                navController.navigate("pedidos/${rol.toString()}")
                            }
                        )
                    }
                    if (rol == "REPARTIDOR") {
                        NavigationDrawerItem(
                            label = { Text("Pedidos Asignados") },
                            selected = false,
                            onClick = {
                                scope.launch { drawerState.close() }
                                navController.navigate("pedidos/${rol.toString()}")
                            }
                        )
                    }
                    NavigationDrawerItem(
                        label = { Text("Cerrar sesión") },
                        selected = false,
                        onClick = {
                            loginViewModel.logout()
                            scope.launch { drawerState.close() }
                            navController.navigate("login") {
                                popUpTo("login") { inclusive = true }
                            }
                        }
                    )
                }
            }
        ) {
            Scaffold(
                topBar = {
                    TopAppBar(
                        title = { Text("CletaEats") },
                        navigationIcon = {
                            IconButton(onClick = {
                                scope.launch { drawerState.open() }
                            }) {
                                Icon(Icons.Filled.Menu, contentDescription = "Menú")
                            }
                        }
                    )
                }
            ) { padding ->
                Box(modifier = Modifier.padding(padding)) {
                    AppNavGraph(navController = navController)
                }
            }
        }
    } else {
        // Si no está logueado, solo se muestra el NavGraph (pantalla de login)
        AppNavGraph(navController = navController)
    }
}
