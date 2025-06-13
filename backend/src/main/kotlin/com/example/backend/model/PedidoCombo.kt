package com.example.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
import org.hibernate.annotations.ColumnDefault
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import java.math.BigDecimal

@IdClass(PedidoComboId::class)
@Entity
@Table(name = "PEDIDO_COMBOS", schema = "PROYECTO_MOVILES")
open class PedidoCombo {
    @Id
    @NotNull
    @Column(name = "PEDIDO_ID", nullable = false)
    open var pedidoId: Long? = null

    @Id
    @NotNull
    @Column(name = "COMBO_ID", nullable = false)
    open var comboId: Long? = null

    @ColumnDefault("1")
    @Column(name = "CANTIDAD")
    open var cantidad: Short? = null

    @NotNull
    @Column(name = "PRECIO_UNIT", nullable = false)
    open var precioUnit: Double? = null

    @Transient
    open var newItem: Boolean = false
}