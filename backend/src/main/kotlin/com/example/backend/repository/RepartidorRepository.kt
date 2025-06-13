package com.example.backend.repository

import com.example.backend.model.Repartidor
import org.springframework.data.jpa.repository.JpaRepository

interface RepartidorRepository: JpaRepository<Repartidor, String> {
}