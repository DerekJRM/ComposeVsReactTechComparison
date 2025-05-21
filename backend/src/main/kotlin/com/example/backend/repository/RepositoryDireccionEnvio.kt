package com.example.backend.repository

import com.example.backend.model.DireccionEnvio
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RepositoryDireccionEnvio: JpaRepository<DireccionEnvio, Long> {
}