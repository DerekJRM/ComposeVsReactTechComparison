package com.example.backend.repository

import com.example.backend.model.Cliente
import org.springframework.data.jpa.repository.JpaRepository

interface ClienteRepository: JpaRepository<Cliente, String> {
}