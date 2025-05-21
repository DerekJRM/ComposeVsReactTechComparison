package com.example.backend.service

import com.example.backend.repository.RepositoryCarrito
import com.example.backend.repository.RepositoryCarritoItem
import com.example.backend.repository.RepositoryDireccionEnvio
import com.example.backend.repository.RepositoryOrden
import com.example.backend.repository.RepositoryPago
import com.example.backend.repository.RepositoryProducto
import com.example.backend.repository.RepositoryUsuario
import org.springframework.stereotype.Service

@Service
class Service(
    private val rCarrito: RepositoryCarrito,
    private val rCarritoItem: RepositoryCarritoItem,
    private val rDireccionenvio: RepositoryDireccionEnvio,
    private val rOrden: RepositoryOrden,
    private val rPago: RepositoryPago,
    private val rProducto: RepositoryProducto,
    private val rUsuario: RepositoryUsuario
) : IService {

}
