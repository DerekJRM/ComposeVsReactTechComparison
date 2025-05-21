package com.example.backend.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.validation.constraints.Size

@Entity
@Table(name = "USUARIO", schema = "PROYECTO_MOVILES")
open class Usuario {
    @Id
    @Column(name = "ID", nullable = false)
    open var id: Long? = null

    @Size(max = 100)
    @Column(name = "NOMBRE", length = 100)
    open var nombre: String? = null

    @Size(max = 100)
    @Column(name = "CORREO", length = 100)
    open var correo: String? = null

    @Size(max = 100)
    @Column(name = "\"CONTRASENA\"", length = 100)
    open var contrasena: String? = null
}