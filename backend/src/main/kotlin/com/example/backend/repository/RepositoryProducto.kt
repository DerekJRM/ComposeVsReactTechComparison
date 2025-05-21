package com.example.backend.repository

import com.example.backend.model.Producto
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RepositoryProducto: JpaRepository<Producto, String> {
}