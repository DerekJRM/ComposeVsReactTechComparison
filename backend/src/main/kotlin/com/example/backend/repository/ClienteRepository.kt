package com.example.backend.repository

import com.example.backend.model.Cliente
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface ClienteRepository: JpaRepository<Cliente, String> {

    @Query("""
        SELECT c FROM Cliente c WHERE 
        LOWER(c.cedula) LIKE LOWER(CONCAT('%', :query, '%')) OR 
        LOWER(c.nombre) LIKE LOWER(CONCAT('%', :query, '%')) OR 
        LOWER(c.email) LIKE LOWER(CONCAT('%', :query, '%'))
    """)
    fun searchClientes(query: String): List<Cliente>
}