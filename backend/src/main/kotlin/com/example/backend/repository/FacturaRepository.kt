package com.example.backend.repository

import com.example.backend.model.Factura
import org.springframework.data.jpa.repository.JpaRepository

interface FacturaRepository: JpaRepository<Factura, Long> {
}