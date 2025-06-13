package com.example.backend.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import org.hibernate.annotations.Immutable
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDateTime

/**
 * Mapping for DB view
 */
@Entity
@Immutable
@Table(name = "VW_FACTURAS", schema = "PROYECTO_MOVILES")
open class Factura protected constructor() {
    @Id
    @NotNull
    @Column(name = "ID", nullable = false)
    open var id: Long? = null
        protected set

    @Size(max = 100)
    @NotNull
    @Column(name = "CLIENTE", nullable = false, length = 100)
    open var cliente: String? = null
        protected set

    @Size(max = 100)
    @NotNull
    @Column(name = "RESTAURANTE", nullable = false, length = 100)
    open var restaurante: String? = null
        protected set

    @Column(name = "FECHA_PEDIDO")
    open var fechaPedido: LocalDateTime? = null
        protected set

    @NotNull
    @Column(name = "SUBTOTAL", nullable = false)
    open var subtotal: Double? = null
        protected set

    @NotNull
    @Column(name = "COSTO_TRANSPORTE", nullable = false)
    open var costoTransporte: Double? = null
        protected set

    @Column(name = "IVA")
    open var iva: Double? = null
        protected set

    @Column(name = "TOTAL")
    open var total: Double? = null
        protected set
}