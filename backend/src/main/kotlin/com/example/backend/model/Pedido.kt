package com.example.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import org.hibernate.annotations.ColumnDefault
import org.hibernate.annotations.Formula
import java.math.BigDecimal
import java.time.Instant

@Entity
@Table(name = "PEDIDOS", schema = "PROYECTO_MOVILES")
open class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PEDIDO_ID", nullable = false)
    open var id: Long? = null

    @NotNull
    @Column(name = "CLIENTE_ID", nullable = false)
    open var clienteId: String? = null

    @NotNull
    @Column(name = "RESTAURANTE_ID", nullable = false)
    open var restauranteId: String? = null

    @Column(name = "REPARTIDOR_ID")
    open var repartidorId: String? = null

    @Size(max = 15)
    @ColumnDefault("'EN_PREPARACION'")
    @Column(name = "ESTADO", length = 15)
    open var estado: String? = null

    @ColumnDefault("SYSTIMESTAMP")
    @Column(name = "FECHA_PEDIDO")
    open var fechaPedido: Instant? = null

    @Column(name = "FECHA_ENTREGA")
    open var fechaEntrega: Instant? = null

    @NotNull
    @Column(name = "SUBTOTAL", nullable = false)
    open var subtotal: Double? = null

    @NotNull
    @Column(name = "COSTO_TRANSPORTE", nullable = false)
    open var costoTransporte: Double? = null

    /** IVA = subtotal * 0.13 */
    @Formula("subtotal * 0.13")
    @Column(name = "iva", insertable = false, updatable = false)
    open var iva: Double? = null

    /**
     * TOTAL = subtotal + costo_transporte + (subtotal * 0.13)
     * Reutilizamos la misma expresión del IVA inline.
     */
    @Formula("subtotal + costo_transporte + (subtotal * 0.13)")
    @Column(name = "total", insertable = false, updatable = false)
    open var total: Double? = null

    @Transient
    open var newItem: Boolean = false
}