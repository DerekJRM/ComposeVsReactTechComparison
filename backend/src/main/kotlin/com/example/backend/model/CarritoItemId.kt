package com.example.backend.model

import jakarta.persistence.Column
import jakarta.persistence.Embeddable
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import org.hibernate.Hibernate
import java.io.Serializable
import java.util.*

@Embeddable
open class CarritoItemId : Serializable {
    @NotNull
    @Column(name = "IDCARRITO", nullable = false)
    open var idcarrito: Long? = null

    @Size(max = 15)
    @NotNull
    @Column(name = "IDPRODUCTO", nullable = false, length = 15)
    open var idproducto: String? = null
    override fun hashCode(): Int = Objects.hash(idcarrito, idproducto)
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false

        other as CarritoItemId

        return idcarrito == other.idcarrito &&
                idproducto == other.idproducto
    }

    companion object {
        private const val serialVersionUID = 0L
    }
}