package com.example.frontend_jetpack_compose.ui.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.frontend_jetpack_compose.data.repository.ClienteRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class LoginViewModel : ViewModel() {
    private val _errorMessage = MutableStateFlow<String?>(null)
    val errorMessage = _errorMessage.asStateFlow()

    fun validarCliente(cedula: String, onSuccess: () -> Unit) {
        viewModelScope.launch {
            val cliente = ClienteRepository.buscarPorCedula(cedula)
            when {
                cliente == null -> _errorMessage.value = "Cliente no registrado"
                cliente.estado == "SUSPENDIDO" -> _errorMessage.value = "Cuenta suspendida"
                else -> onSuccess()
            }
        }
    }

    fun resetError() {
        _errorMessage.value = null
    }
}