package com.example.backend.repository

import com.example.backend.model.CarritoItem
import com.example.backend.model.CarritoItemId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RepositoryCarritoItem : JpaRepository<CarritoItem, CarritoItemId> {
}