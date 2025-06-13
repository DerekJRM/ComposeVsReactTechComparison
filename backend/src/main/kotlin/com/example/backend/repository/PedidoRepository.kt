package com.example.backend.repository

import com.example.backend.model.Pedido
import org.springframework.data.jpa.repository.JpaRepository

interface PedidoRepository: JpaRepository<Pedido, Long> {
}