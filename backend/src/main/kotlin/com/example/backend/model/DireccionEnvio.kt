package com.example.backend.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.validation.constraints.Size

@Entity
@Table(name = "DIRECCIONENVIO", schema = "PROYECTO_MOVILES")
open class DireccionEnvio {
    @Id
    @Column(name = "IDORDEN", nullable = false)
    open var id: Long? = null

    @Size(max = 100)
    @Column(name = "CALLE", length = 100)
    open var calle: String? = null

    @Size(max = 100)
    @Column(name = "CIUDAD", length = 100)
    open var ciudad: String? = null

    @Size(max = 100)
    @Column(name = "PAIS", length = 100)
    open var pais: String? = null

    @Size(max = 20)
    @Column(name = "CODIGOPOSTAL", length = 20)
    open var codigopostal: String? = null
}