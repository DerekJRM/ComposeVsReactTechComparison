package com.example.backend.repository

import com.example.backend.model.Queja
import org.springframework.data.jpa.repository.JpaRepository

interface QuejaRepository: JpaRepository<Queja, Long> {
}