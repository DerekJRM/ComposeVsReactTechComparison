package com.example.backend.repository

import com.example.backend.model.Queja
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface QuejaRepository: JpaRepository<Queja, Long> {
    fun findByClienteId(clienteId: String): List<Queja>
    fun findByRepartidorId(repartidorId: String): List<Queja>

    @Query("SELECT q FROM Queja q ORDER BY q.fechaQueja DESC")
    fun findAllOrderByFechaDesc(): List<Queja>
}