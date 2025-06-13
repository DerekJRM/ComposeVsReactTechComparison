package com.example.backend.service

import com.example.backend.model.Cliente
import com.example.backend.model.Repartidor
import com.example.backend.model.Usuario
import com.example.backend.repository.ClienteRepository
import com.example.backend.repository.RepartidorRepository
import com.example.backend.repository.UsuarioRepository
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class Service(
    private val usuarioRepository: UsuarioRepository,
    private val clienteRepository: ClienteRepository,
    private val repartidorRepository: RepartidorRepository
) : IService {

    override fun getUsuarioById(cedula: String): Usuario? {
        return usuarioRepository.findById(cedula).orElse(null)
    }

    override fun getClienteById(cedula: String): Cliente? {
        return clienteRepository.findById(cedula).orElse(null)
    }

    override fun getRepartidorById(cedula: String): Repartidor? {
        return repartidorRepository.findById(cedula).orElse(null)
    }
}
