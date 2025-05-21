package com.example.backend.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.validation.constraints.Size

@Entity
@Table(name = "PRODUCTO", schema = "PROYECTO_MOVILES")
open class Producto {
    @Id
    @Size(max = 15)
    @Column(name = "ID", nullable = false, length = 15)
    open var id: String? = null

    @Size(max = 100)
    @Column(name = "NOMBRE", length = 100)
    open var nombre: String? = null

    @Size(max = 255)
    @Column(name = "DESCRIPCION")
    open var descripcion: String? = null

    @Column(name = "PRECIO")
    open var precio: Double? = null

    @Column(name = "STOCK")
    open var stock: Long? = null
}