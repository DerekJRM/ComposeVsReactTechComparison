package com.example.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import org.hibernate.annotations.ColumnDefault
import java.time.LocalDate

@Entity
@Table(name = "QUEJAS", schema = "PROYECTO_MOVILES")
open class Queja {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QUEJA_ID", nullable = false)
    open var id: Long? = null

    @NotNull
    @Column(name = "REPARTIDOR_ID", nullable = false)
    open var repartidorId: String? = null

    @NotNull
    @Column(name = "CLIENTE_ID", nullable = false)
    open var clienteId: String? = null

    @Size(max = 4000)
    @NotNull
    @Column(name = "DESCRIPCION", nullable = false, length = 4000)
    open var descripcion: String? = null

    @ColumnDefault("SYSDATE")
    @Column(name = "FECHA_QUEJA")
    open var fechaQueja: LocalDate? = null

    @Transient
    open var newItem: Boolean = false
}