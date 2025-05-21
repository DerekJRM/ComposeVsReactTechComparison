package com.example.backend.model

import jakarta.persistence.Column
import jakarta.persistence.EmbeddedId
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "CARRITOITEM", schema = "PROYECTO_MOVILES")
open class CarritoItem {
    @EmbeddedId
    open var id: CarritoItemId? = null

    @Column(name = "CANTIDAD")
    open var cantidad: Long? = null

    @Column(name = "SUBTOTAL")
    open var subtotal: Double? = null
}