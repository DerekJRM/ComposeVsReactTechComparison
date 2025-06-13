package com.example.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
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

    @Transient
    open var newItem: Boolean = false
}