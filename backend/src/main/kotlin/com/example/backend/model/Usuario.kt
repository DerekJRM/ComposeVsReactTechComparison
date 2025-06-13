package com.example.backend.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import org.hibernate.annotations.ColumnDefault

@Entity
@Table(name = "USUARIOS", schema = "PROYECTO_MOVILES")
open class Usuario {
    @Id
    @Size(max = 12)
    @Column(name = "CEDULA", nullable = false, length = 12)
    open var cedula: String? = null

    @Size(max = 12)
    @ColumnDefault("'CLIENTE'")
    @Column(name = "ROL", length = 12)
    open var rol: String? = null

    @Size(max = 200)
    @NotNull
    @Column(name = "CONTRASENA", nullable = false, length = 200)
    open var contrasena: String? = null
}