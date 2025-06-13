package com.example.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

@Entity
@Table(name = "RESTAURANTES", schema = "PROYECTO_MOVILES")
open class Restaurante {
    @Id
    @Size(max = 20)
    @NotNull
    @Column(name = "CEDULA_JURIDICA", nullable = false, length = 20)
    open var cedulaJuridica: String? = null

    @Size(max = 100)
    @NotNull
    @Column(name = "NOMBRE", nullable = false, length = 100)
    open var nombre: String? = null

    @Size(max = 200)
    @NotNull
    @Column(name = "DIRECCION", nullable = false, length = 200)
    open var direccion: String? = null

    @Size(max = 50)
    @NotNull
    @Column(name = "TIPO_COMIDA", nullable = false, length = 50)
    open var tipoComida: String? = null

    @Transient
    open var newItem: Boolean = false
}