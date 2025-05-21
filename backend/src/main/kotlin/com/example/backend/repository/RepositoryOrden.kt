package com.example.backend.repository

import com.example.backend.model.Orden
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RepositoryOrden: JpaRepository<Orden, Long> {
}