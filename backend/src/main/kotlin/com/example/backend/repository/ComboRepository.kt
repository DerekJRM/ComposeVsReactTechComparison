package com.example.backend.repository

import com.example.backend.model.Combo
import org.springframework.data.jpa.repository.JpaRepository

interface ComboRepository: JpaRepository<Combo, Long> {
}