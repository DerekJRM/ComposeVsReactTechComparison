package com.example.backend.repository

import com.example.backend.model.Restaurante
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface RestauranteRepository: JpaRepository<Restaurante, String> {
    @Query("""
        SELECT r FROM Restaurante r WHERE 
        LOWER(r.cedulaJuridica) LIKE LOWER(CONCAT('%', :query, '%')) OR 
        LOWER(r.nombre) LIKE LOWER(CONCAT('%', :query, '%')) OR 
        LOWER(r.tipoComida) LIKE LOWER(CONCAT('%', :query, '%'))
    """)
    fun searchRestaurantes(query: String): List<Restaurante>
}