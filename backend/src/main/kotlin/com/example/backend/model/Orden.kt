package com.example.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.Size
import java.time.LocalDate

@Entity
@Table(name = "ORDEN", schema = "PROYECTO_MOVILES")
open class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    open var id: Long? = null

    @Column(name = "FECHA")
    open var fecha: LocalDate? = null

    @Column(name = "TOTAL")
    open var total: Double? = null

    @Size(max = 50)
    @Column(name = "ESTADO", length = 50)
    open var estado: String? = null

    @Column(name = "IDUSUARIO")
    open var idusuario: Long? = null
}