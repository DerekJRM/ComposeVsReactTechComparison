package com.example.frontend_jetpack_compose.ui.screens

import android.widget.Toast
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.frontend_jetpack_compose.R
import com.example.frontend_jetpack_compose.data.model.Cliente
import com.example.frontend_jetpack_compose.data.model.Repartidor
import com.example.frontend_jetpack_compose.data.model.Usuario
import com.example.frontend_jetpack_compose.data.repository.ClienteRepository
import com.example.frontend_jetpack_compose.data.repository.RepartidorRepository
import com.example.frontend_jetpack_compose.data.repository.UsuarioRepository
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RegistroScreen(navController: NavController) {

    val focusCedula = remember { FocusRequester() }
    val focusNombre = remember { FocusRequester() }
    val focusDireccion = remember { FocusRequester() }
    val focusTelefono = remember { FocusRequester() }
    val focusEmail = remember { FocusRequester() }
    val focusTarjeta = remember { FocusRequester() }
    val focusContrasena = remember { FocusRequester() }

    var errorCedula by remember { mutableIntStateOf(0) }
    var errorNombre by remember { mutableIntStateOf(0) }
    var errorDireccion by remember { mutableIntStateOf(0) }
    var errorTelefono by remember { mutableIntStateOf(0) }
    var errorEmail by remember { mutableIntStateOf(0) }
    var errorTarjeta by remember { mutableIntStateOf(0) }
    var errorContrasena by remember { mutableStateOf(false) }

    var cedula by remember { mutableStateOf("") }
    var nombre by remember { mutableStateOf("") }
    var direccion by remember { mutableStateOf("") }
    var telefono by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var numTarjeta by remember { mutableStateOf("") }
    var contrasena by remember { mutableStateOf("") }

    var passwordVisible by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf("") }
    val coroutineScope = rememberCoroutineScope()
    val context = LocalContext.current

    val scrollState = rememberScrollState()

    val roles = listOf("CLIENTE", "REPARTIDOR")
    var rolSeleccionado by remember { mutableStateOf(roles[0]) }
    var expanded by remember { mutableStateOf(false) }

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
                .verticalScroll(scrollState)
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
                        .border(0.dp, Color.Gray, RoundedCornerShape(16.dp)),
                    contentScale = ContentScale.Crop
                )

                Spacer(modifier = Modifier.height(12.dp))

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

                OutlinedTextField(
                    value = nombre,
                    onValueChange = {
                        nombre = it
                        if (it.isNotBlank()) errorNombre = 0
                    },
                    label = { Text("Nombre") },
                    singleLine = true,
                    isError = errorNombre != 0,
                    supportingText = {
                        if (errorNombre == 1) {
                            Text("Debe ingresar el nombre", color = MaterialTheme.colorScheme.error)
                        } else if (errorNombre == 2) {
                            Text("Formato incorrecto", color = MaterialTheme.colorScheme.error)
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .focusRequester(focusNombre)
                )

                OutlinedTextField(
                    value = direccion,
                    onValueChange = {
                        direccion = it
                        if (it.isNotBlank()) errorDireccion = 0
                    },
                    label = { Text("Dirección") },
                    singleLine = true,
                    isError = errorDireccion != 0,
                    supportingText = {
                        if (errorDireccion == 1) {
                            Text("Debe ingresar la dirección", color = MaterialTheme.colorScheme.error)
                        } else if (errorDireccion == 2) {
                            Text("Formato incorrecto", color = MaterialTheme.colorScheme.error)
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .focusRequester(focusDireccion)
                )

                OutlinedTextField(
                    value = telefono,
                    onValueChange = {
                        telefono = it
                        if (it.isNotBlank()) errorTelefono = 0
                    },
                    label = { Text("Teléfono") },
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
                    isError = errorTelefono != 0,
                    supportingText = {
                        if (errorTelefono == 1) {
                            Text("Debe ingresar el teléfono", color = MaterialTheme.colorScheme.error)
                        } else if (errorTelefono == 2) {
                            Text("Formato incorrecto", color = MaterialTheme.colorScheme.error)
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .focusRequester(focusTelefono)
                )

                OutlinedTextField(
                    value = email,
                    onValueChange = {
                        email = it
                        if (it.isNotBlank()) errorEmail = 0
                    },
                    label = { Text("Correo electrónico") },
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                    isError = errorEmail != 0,
                    supportingText = {
                        if (errorEmail == 1) {
                            Text("Debe ingresar el correo electrónico", color = MaterialTheme.colorScheme.error)
                        } else if (errorEmail == 2) {
                            Text("Formato incorrecto", color = MaterialTheme.colorScheme.error)
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .focusRequester(focusEmail)
                )

                OutlinedTextField(
                    value = numTarjeta,
                    onValueChange = {
                        numTarjeta = it
                        if (it.isNotBlank()) errorTarjeta = 0
                    },
                    label = { Text("Número de tarjeta") },
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    isError = errorTarjeta != 0,
                    supportingText = {
                        if (errorTarjeta == 1) {
                            Text("Debe ingresar el número de tarjeta", color = MaterialTheme.colorScheme.error)
                        } else if (errorTarjeta == 2) {
                            Text("Formato incorrecto", color = MaterialTheme.colorScheme.error)
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .focusRequester(focusTarjeta)
                )

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

                // Rol selector
                ExposedDropdownMenuBox(
                    expanded = expanded,
                    onExpandedChange = { expanded = !expanded }
                ) {
                    OutlinedTextField(
                        value = rolSeleccionado,
                        onValueChange = {},
                        readOnly = true,
                        label = { Text("Rol") },
                        trailingIcon = {
                            ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
                        },
                        modifier = Modifier
                            .menuAnchor()
                            .fillMaxWidth()
                    )
                    ExposedDropdownMenu(
                        expanded = expanded,
                        onDismissRequest = { expanded = false }
                    ) {
                        roles.forEach { rol ->
                            DropdownMenuItem(
                                text = { Text(rol) },
                                onClick = {
                                    rolSeleccionado = rol
                                    expanded = false
                                }
                            )
                        }
                    }
                }

                Text(
                    text = errorMessage,
                    color = MaterialTheme.colorScheme.error,
                    style = MaterialTheme.typography.bodyLarge
                )

                Button(
                    onClick = {
                        coroutineScope.launch {
                            when {
                                cedula.isBlank() -> {
                                    errorCedula = 1
                                    focusCedula.requestFocus()
                                }
                                !cedula.matches(Regex("\\d{9}")) -> {
                                    errorCedula = 2
                                    focusCedula.requestFocus()
                                }
                                nombre.isBlank() -> {
                                    errorNombre = 1
                                    focusNombre.requestFocus()
                                }
                                !nombre.matches(Regex("^[a-zA-Z\\s]+$")) -> {
                                    errorNombre = 2
                                    focusNombre.requestFocus()
                                }
                                direccion.isBlank() -> {
                                    errorDireccion = 1
                                    focusDireccion.requestFocus()
                                }
                                !direccion.matches(Regex("^[a-zA-Z0-9\\s,.-]+$")) -> {
                                    errorDireccion = 2
                                    focusDireccion.requestFocus()
                                }
                                telefono.isBlank() -> {
                                    errorTelefono = 1
                                    focusTelefono.requestFocus()
                                }
                                !telefono.matches(Regex("^\\d{8}$")) -> {
                                    errorTelefono = 2
                                    focusTelefono.requestFocus()
                                }
                                email.isBlank() -> {
                                    errorEmail = 1
                                    focusEmail.requestFocus()
                                }
                                !email.matches(Regex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) -> {
                                    errorEmail = 2
                                    focusEmail.requestFocus()
                                }
                                numTarjeta.isBlank() -> {
                                    errorTarjeta = 1
                                    focusTarjeta.requestFocus()
                                }
                                !numTarjeta.matches(Regex("^\\d{16}$")) -> {
                                    errorTarjeta = 2
                                    focusTarjeta.requestFocus()
                                }
                                contrasena.isBlank() -> {
                                    errorContrasena = true
                                    focusContrasena.requestFocus()
                                }
                                else -> {
                                    // Resetear errores si todo está bien
                                    errorCedula = 0
                                    errorNombre = 0
                                    errorDireccion = 0
                                    errorTelefono = 0
                                    errorEmail = 0
                                    errorTarjeta = 0
                                    errorContrasena = false

                                    errorMessage = ""

                                    val usuarioCreado = UsuarioRepository.createUsuario(
                                        Usuario(
                                            cedula = cedula,
                                            contrasena = contrasena,
                                            rol = rolSeleccionado
                                        )
                                    )

                                    val personaCreada = when (rolSeleccionado) {
                                        "CLIENTE" -> ClienteRepository.createCliente(
                                            Cliente(
                                                cedula = cedula,
                                                nombre = nombre,
                                                direccion = direccion,
                                                telefono = telefono,
                                                email = email,
                                                numTarjeta = numTarjeta,
                                                estado = "ACTIVO",
                                                newItem = true
                                            )
                                        )
                                        "REPARTIDOR" -> RepartidorRepository.createRepartidor(
                                            Repartidor(
                                                cedula = cedula,
                                                nombre = nombre,
                                                direccion = direccion,
                                                telefono = telefono,
                                                email = email,
                                                numTarjeta = numTarjeta,
                                                estado = "DISPONIBLE",
                                                newItem = true,
                                                distanciaPedidoKm = 0.0,
                                                kmRecorridosDiarios = 0.0,
                                                costoKmHabil = 1000.0,
                                                costoKmFeriado = 1500.0,
                                                amonestaciones = 0.0,
                                            )
                                        )
                                        else -> null
                                    }

                                    // Puedes verificar el resultado si lo deseas:
                                    if (personaCreada  != null && usuarioCreado != null) {
                                        Toast.makeText(context, "$rolSeleccionado registrado correctamente", Toast.LENGTH_SHORT).show()
                                        navController.navigate("login")
                                    } else {
                                        errorMessage = "Error al crear el cliente."
                                    }
                                }
                            }
                        }
                    },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Registrarse")
                }

                Spacer(modifier = Modifier.height(16.dp))

                Button(
                    onClick = {
                        navController.popBackStack()
                    },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary)
                ) {
                    Text("Regresar")
                }

            }
        }
    }
}
