package com.example.backend.repository

import com.example.backend.model.Usuario
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RepositoryUsuario: JpaRepository<Usuario, Long> {
}