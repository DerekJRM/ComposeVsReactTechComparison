package com.example.backend.repository

import com.example.backend.model.Pago
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RepositoryPago: JpaRepository<Pago, Long> {
}