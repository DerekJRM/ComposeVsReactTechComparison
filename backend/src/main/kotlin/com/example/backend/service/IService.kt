package com.example.backend.service

import com.example.backend.model.Cliente
import com.example.backend.model.Combo
import com.example.backend.model.Repartidor
import com.example.backend.model.Usuario
import org.apache.coyote.Response
import java.util.Optional

interface IService {
    fun getUsuarioById(cedula: String): Usuario?

    fun getClienteById(cedula: String): Cliente?

    fun getRepartidorById(cedula: String): Repartidor?
}