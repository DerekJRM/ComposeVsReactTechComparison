package com.example.backend.repository

import com.example.backend.model.Usuario
import org.springframework.data.jpa.repository.JpaRepository

interface UsuarioRepository: JpaRepository<Usuario, String> {
}