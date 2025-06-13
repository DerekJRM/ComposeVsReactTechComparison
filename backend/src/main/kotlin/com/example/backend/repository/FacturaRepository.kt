package com.example.backend.repository

import com.example.backend.model.Factura
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface FacturaRepository: JpaRepository<Factura, Long> {
    @Query("SELECT f FROM Factura f WHERE LOWER(f.cliente) LIKE LOWER(CONCAT('%', :clienteId, '%'))")
    fun findByClienteContainingIgnoreCase(clienteId: String): List<Factura>

    @Query("SELECT f FROM Factura f WHERE LOWER(f.restaurante) LIKE LOWER(CONCAT('%', :restauranteId, '%'))")
    fun findByRestauranteContainingIgnoreCase(restauranteId: String): List<Factura>
}