package com.example.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.Size

@Entity
@Table(name = "PAGO", schema = "PROYECTO_MOVILES")
open class Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    open var id: Long? = null

    @Size(max = 50)
    @Column(name = "METODO", length = 50)
    open var metodo: String? = null

    @Column(name = "MONTO")
    open var monto: Double? = null

    @Column(name = "IDORDEN")
    open var idorden: Long? = null
}