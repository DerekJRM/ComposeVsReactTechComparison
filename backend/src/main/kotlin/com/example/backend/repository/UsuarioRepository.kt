package com.example.backend.repository

import com.example.backend.model.Usuario
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface UsuarioRepository: JpaRepository<Usuario, String> {
    @Query("""
        SELECT u FROM Usuario u WHERE 
        LOWER(u.cedula) LIKE LOWER(CONCAT('%', :query, '%')) OR 
        LOWER(u.rol) LIKE LOWER(CONCAT('%', :query, '%'))
    """)
    fun searchUsuarios(query: String): List<Usuario>

    fun findByRol(rol: String): List<Usuario>
}