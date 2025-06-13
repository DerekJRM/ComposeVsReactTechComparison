package com.example.backend.repository

import com.example.backend.model.Repartidor
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface RepartidorRepository: JpaRepository<Repartidor, String> {
    @Query("""
        SELECT r FROM Repartidor r WHERE 
        LOWER(r.cedula) LIKE LOWER(CONCAT('%', :query, '%')) OR 
        LOWER(r.nombre) LIKE LOWER(CONCAT('%', :query, '%')) OR 
        LOWER(r.email) LIKE LOWER(CONCAT('%', :query, '%'))
    """)
    fun searchRepartidores(query: String): List<Repartidor>

    fun findByEstado(estado: String): List<Repartidor>
}