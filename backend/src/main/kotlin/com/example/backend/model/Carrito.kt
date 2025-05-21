package com.example.backend.model

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "CARRITO", schema = "PROYECTO_MOVILES")
open class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    open var id: Long? = null

    @Column(name = "FECHACREACION")
    open var fechacreacion: LocalDate? = null

    @Column(name = "IDUSUARIO")
    open var idusuario: Long? = null
}