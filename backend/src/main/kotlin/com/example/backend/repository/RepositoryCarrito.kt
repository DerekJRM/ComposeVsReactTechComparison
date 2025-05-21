package com.example.backend.repository

import com.example.backend.model.Carrito
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RepositoryCarrito: JpaRepository<Carrito, Long> {
}