package com.example.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.math.BigDecimal

@Entity
@Table(name = "COMBOS", schema = "PROYECTO_MOVILES")
open class Combo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMBO_ID", nullable = false)
    open var id: Long? = null

    @NotNull
    @Column(name = "RESTAURANTE_ID", nullable = false)
    open var restauranteId: String? = null

    @NotNull
    @Column(name = "COMBO_NUM", nullable = false)
    open var comboNum: Short? = null

    @NotNull
    @Column(name = "PRECIO", nullable = false)
    open var precio: Double? = null

    @Size(max = 200)
    @NotNull
    @Column(name = "DESCRIPCION", length = 200)
    open var descripcion: String? = null

    @Transient
    open var newItem: Boolean = false
}