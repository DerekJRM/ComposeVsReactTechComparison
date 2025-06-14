package com.example.frontend_jetpack_compose.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.frontend_jetpack_compose.R
import com.example.frontend_jetpack_compose.data.LoginViewModel

@Composable
fun LoginScreen(
    navController: NavController,
    viewModel: LoginViewModel = LoginViewModel()
) {
    val focusCedula = remember { FocusRequester() }
    val focusContrasena = remember { FocusRequester() }

    var errorCedula by remember { mutableStateOf(0) }
    var errorContrasena by remember { mutableStateOf(false) }

    var cedula by remember { mutableStateOf("") }
    var contrasena by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }
    val errorMessage by viewModel.errorMessage.collectAsState()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(
                        MaterialTheme.colorScheme.primary,
                        MaterialTheme.colorScheme.secondary
                    )
                )
            ),
        contentAlignment = Alignment.Center
    ) {
        Card(
            shape = RoundedCornerShape(16.dp),
            elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .padding(24.dp)
                    .fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Image(
                    painter = painterResource(R.drawable.ic_app_logo),
                    contentDescription = "App logo",
                    modifier = Modifier
                        .size(150.dp)
                        .clip(RoundedCornerShape(16.dp))
                        .border(2.dp, Color.Gray, RoundedCornerShape(16.dp)),
                    contentScale = ContentScale.Crop
                )

                OutlinedTextField(
                    value = cedula,
                    onValueChange = {
                        cedula = it
                        if (it.isNotBlank()) errorCedula = 0
                    },
                    label = { Text("Cédula") },
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    isError = errorCedula != 0,
                    supportingText = {
                        if (errorCedula == 1) {
                            Text("Debe ingresar la cédula", color = MaterialTheme.colorScheme.error)
                        } else if (errorCedula == 2) {
                            Text("Formato incorrecto", color = MaterialTheme.colorScheme.error)
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .focusRequester(focusCedula)
                )

                Spacer(modifier = Modifier.height(16.dp))

                OutlinedTextField(
                    value = contrasena,
                    onValueChange = {
                        contrasena = it
                        if (it.isNotBlank()) errorContrasena = false
                    },
                    label = { Text("Contraseña") },
                    singleLine = true,
                    isError = errorContrasena,
                    supportingText = {
                        if (errorContrasena) Text("Debe ingresar la contraseña", color = MaterialTheme.colorScheme.error)
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .focusRequester(focusContrasena),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                    trailingIcon = {
                        val image = if (passwordVisible) Icons.Filled.Visibility else Icons.Filled.VisibilityOff
                        IconButton(onClick = { passwordVisible = !passwordVisible }) {
                            Icon(imageVector = image, contentDescription = if (passwordVisible) "Ocultar contraseña" else "Mostrar contraseña")
                        }
                    }
                )

                errorMessage?.let {
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = it,
                        color = MaterialTheme.colorScheme.error,
                        style = MaterialTheme.typography.bodyLarge
                    )
                }

                Spacer(modifier = Modifier.height(24.dp))

                Button(
                    onClick = {

                        when {
                            cedula.isBlank() -> {
                                errorCedula = 1
                                focusCedula.requestFocus()
                            }
                            !cedula.matches(Regex("\\d{9,10}")) -> {
                                errorCedula = 2
                                focusCedula.requestFocus()
                            }
                            contrasena.isBlank() -> {
                                errorContrasena = true
                                focusContrasena.requestFocus()
                            }
                            else -> {
                                // Resetear errores si todo está bien
                                errorCedula = 0
                                errorContrasena = false

                                // Llamar al ViewModel para iniciar sesión
                                viewModel.login(cedula, contrasena) {}
                            }
                        }
                    },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Iniciar sesión")
                }

                Spacer(modifier = Modifier.height(12.dp))

                Button(
                    onClick = {
                        navController.navigate("registro")
                    },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary)
                ) {
                    Text("Registrarse")
                }
            }
        }
    }
}
