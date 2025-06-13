package com.example.frontend_jetpack_compose.data

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.frontend_jetpack_compose.data.repository.ClienteRepository
import com.example.frontend_jetpack_compose.data.repository.RepartidorRepository
import com.example.frontend_jetpack_compose.data.repository.UsuarioRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class LoginViewModel : ViewModel() {
    private val _errorMessage = MutableStateFlow<String?>(null)
    val errorMessage = _errorMessage.asStateFlow()
    private val _isLoggedIn = MutableStateFlow(false)
    val isLoggedIn = _isLoggedIn.asStateFlow()

    fun login(cedula: String, contrasena: String, onSuccess: () -> Unit) {
        viewModelScope.launch(Dispatchers.IO) {
            val usuario = UsuarioRepository.login(cedula, contrasena)
            when {
                usuario == null -> {
                    _errorMessage.value = "Usuario no registrado"
                }
                usuario.rol == "CLIENTE" -> {
                    val cliente = ClienteRepository.getClienteById(cedula)
                    if (cliente == null) {
                        _errorMessage.value = "Cliente no encontrado"
                    } else if (cliente.estado == "SUSPENDIDO") {
                        _errorMessage.value = "Cliente suspendido"
                    } else {
                        _isLoggedIn.value = true
                        withContext(Dispatchers.Main) {
                            onSuccess()
                        }
                    }
                }
                usuario.rol == "REPARTIDOR" -> {
                    val repartidor = RepartidorRepository.getRepartidorById(cedula)
                    if (repartidor == null) {
                        _errorMessage.value = "Repartidor no encontrado"
                    } else if (repartidor.amonestaciones >= 4) {
                        _errorMessage.value = "Repartidor suspendido"
                    } else {
                        _isLoggedIn.value = true
                        withContext(Dispatchers.Main) {
                            onSuccess()
                        }
                    }
                }
                else -> {
                    _errorMessage.value = "Rol de usuario desconocido"
                }
            }
        }
    }

    fun resetError() {
        _errorMessage.value = null
    }

    fun logout() {
        _isLoggedIn.value = false
        resetError()
    }
}