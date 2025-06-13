package com.example.backend.repository

import com.example.backend.model.PedidoCombo
import com.example.backend.model.PedidoComboId
import org.springframework.data.jpa.repository.JpaRepository

interface PedidoComboRepository: JpaRepository<PedidoCombo, PedidoComboId> {
}