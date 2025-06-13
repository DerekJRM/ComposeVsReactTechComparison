package com.example.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import org.hibernate.annotations.ColumnDefault
import java.math.BigDecimal

@Entity
@Table(name = "REPARTIDORES", schema = "PROYECTO_MOVILES")
open class Repartidor {
    @Id
    @Size(max = 12)
    @NotNull
    @Column(name = "CEDULA", nullable = false, length = 12)
    open var cedula: String? = null

    @Size(max = 100)
    @NotNull
    @Column(name = "NOMBRE", nullable = false, length = 100)
    open var nombre: String? = null

    @Size(max = 100)
    @NotNull
    @Column(name = "EMAIL", nullable = false, length = 100)
    open var email: String? = null

    @Size(max = 200)
    @NotNull
    @Column(name = "DIRECCION", nullable = false, length = 200)
    open var direccion: String? = null

    @Size(max = 20)
    @NotNull
    @Column(name = "TELEFONO", nullable = false, length = 20)
    open var telefono: String? = null

    @Size(max = 30)
    @NotNull
    @Column(name = "NUM_TARJETA", nullable = false, length = 30)
    open var numTarjeta: String? = null

    @Size(max = 10)
    @ColumnDefault("'DISPONIBLE'")
    @Column(name = "ESTADO", length = 10)
    open var estado: String? = null

    @Column(name = "DISTANCIA_PEDIDO_KM")
    open var distanciaPedidoKm: Double? = null

    @Column(name = "KM_RECORRIDOS_DIARIOS")
    open var kmRecorridosDiarios: Double? = null

    @ColumnDefault("1000")
    @Column(name = "COSTO_KM_HABIL")
    open var costoKmHabil: Double? = null

    @ColumnDefault("1500")
    @Column(name = "COSTO_KM_FERIADO")
    open var costoKmFeriado: Double? = null

    @ColumnDefault("0")
    @Column(name = "AMONESTACIONES")
    open var amonestaciones: Double? = null

    @Transient
    open var newItem: Boolean = false
}