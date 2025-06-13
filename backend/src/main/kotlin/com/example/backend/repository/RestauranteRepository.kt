package com.example.backend.repository

import com.example.backend.model.Restaurante
import org.springframework.data.jpa.repository.JpaRepository

interface RestauranteRepository: JpaRepository<Restaurante, String> {
}