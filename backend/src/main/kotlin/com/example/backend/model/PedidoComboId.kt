package com.example.backend.model

import java.io.Serializable


data class PedidoComboId(

    var pedidoId: Long? = null,

    var comboId: Long? = null
) : Serializable