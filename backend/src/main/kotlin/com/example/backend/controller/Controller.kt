package com.example.backend.controller

import com.example.backend.model.*
import com.example.backend.service.IService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class Controller(
    private val service: IService,
) {
    // ========== AUTENTICACIÓN ==========
    @GetMapping("/login/{cedula}/{contrasena}")
    fun login(@PathVariable cedula: String, @PathVariable contrasena: String): ResponseEntity<Any> {
        val usuario = service.getUsuarioById(cedula)
        if (usuario != null && usuario.contrasena == contrasena) {
            usuario.contrasena = null
            return ResponseEntity.ok(usuario)
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(mapOf("mensaje" to "Credenciales inválidas"))
        }
    }

    // ========== USUARIO ==========
    @GetMapping("/usuarios/{cedula}")
    fun getUsuarioById(@PathVariable cedula: String): ResponseEntity<Any> {
        return service.getUsuarioById(cedula)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(mapOf("mensaje" to "Usuario no encontrado"))
    }

    @PostMapping("/usuarios")
    fun createUsuario(@RequestBody usuario: Usuario): ResponseEntity<Usuario> {
        return ResponseEntity.ok(service.saveUsuario(usuario))
    }

    @PutMapping("/usuarios/{cedula}")
    fun updateUsuario(@PathVariable cedula: String, @RequestBody usuario: Usuario): ResponseEntity<Any> {
        return if (service.getUsuarioById(cedula) != null) {
            ResponseEntity.ok(service.saveUsuario(usuario))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Usuario no encontrado"))
        }
    }

    @DeleteMapping("/usuarios/{cedula}")
    fun deleteUsuario(@PathVariable cedula: String): ResponseEntity<Any> {
        return if (service.getUsuarioById(cedula) != null) {
            service.deleteUsuario(cedula)
            ResponseEntity.ok().build()
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Usuario no encontrado"))
        }
    }

    @GetMapping("/usuarios")
    fun getAllUsuarios(): ResponseEntity<List<Usuario>> {
        return ResponseEntity.ok(service.getAllUsuarios())
    }

    // ========== CLIENTE ==========
    @GetMapping("/clientes/{cedula}")
    fun getClienteById(@PathVariable cedula: String): ResponseEntity<Any> {
        return service.getClienteById(cedula)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(mapOf("mensaje" to "Cliente no encontrado"))
    }

    @PostMapping("/clientes")
    fun createCliente(@RequestBody cliente: Cliente): ResponseEntity<Cliente> {
        return ResponseEntity.ok(service.saveCliente(cliente))
    }

    @PutMapping("/clientes/{cedula}")
    fun updateCliente(@PathVariable cedula: String, @RequestBody cliente: Cliente): ResponseEntity<Any> {
        return if (service.getClienteById(cedula) != null) {
            ResponseEntity.ok(service.saveCliente(cliente))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Cliente no encontrado"))
        }
    }

    @DeleteMapping("/clientes/{cedula}")
    fun deleteCliente(@PathVariable cedula: String): ResponseEntity<Any> {
        return if (service.getClienteById(cedula) != null) {
            service.deleteCliente(cedula)
            ResponseEntity.ok().build()
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Cliente no encontrado"))
        }
    }

    @GetMapping("/clientes")
    fun getAllClientes(): ResponseEntity<List<Cliente>> {
        return ResponseEntity.ok(service.getAllClientes())
    }

    // ========== REPARTIDOR ==========
    @GetMapping("/repartidores/{cedula}")
    fun getRepartidorById(@PathVariable cedula: String): ResponseEntity<Any> {
        return service.getRepartidorById(cedula)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(mapOf("mensaje" to "Repartidor no encontrado"))
    }

    @PostMapping("/repartidores")
    fun createRepartidor(@RequestBody repartidor: Repartidor): ResponseEntity<Repartidor> {
        return ResponseEntity.ok(service.saveRepartidor(repartidor))
    }

    @PutMapping("/repartidores/{cedula}")
    fun updateRepartidor(@PathVariable cedula: String, @RequestBody repartidor: Repartidor): ResponseEntity<Any> {
        return if (service.getRepartidorById(cedula) != null) {
            ResponseEntity.ok(service.saveRepartidor(repartidor))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Repartidor no encontrado"))
        }
    }

    @DeleteMapping("/repartidores/{cedula}")
    fun deleteRepartidor(@PathVariable cedula: String): ResponseEntity<Any> {
        return if (service.getRepartidorById(cedula) != null) {
            service.deleteRepartidor(cedula)
            ResponseEntity.ok().build()
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Repartidor no encontrado"))
        }
    }

    @GetMapping("/repartidores")
    fun getAllRepartidores(): ResponseEntity<List<Repartidor>> {
        return ResponseEntity.ok(service.getAllRepartidores())
    }

    // ========== RESTAURANTE ==========
    @GetMapping("/restaurantes/{cedulaJuridica}")
    fun getRestauranteById(@PathVariable cedulaJuridica: String): ResponseEntity<Any> {
        return service.getRestauranteById(cedulaJuridica)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(mapOf("mensaje" to "Restaurante no encontrado"))
    }

    @PostMapping("/restaurantes")
    fun createRestaurante(@RequestBody restaurante: Restaurante): ResponseEntity<Restaurante> {
        return ResponseEntity.ok(service.saveRestaurante(restaurante))
    }

    @PutMapping("/restaurantes/{cedulaJuridica}")
    fun updateRestaurante(
        @PathVariable cedulaJuridica: String,
        @RequestBody restaurante: Restaurante
    ): ResponseEntity<Any> {
        return if (service.getRestauranteById(cedulaJuridica) != null) {
            ResponseEntity.ok(service.saveRestaurante(restaurante))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Restaurante no encontrado"))
        }
    }

    @DeleteMapping("/restaurantes/{cedulaJuridica}")
    fun deleteRestaurante(@PathVariable cedulaJuridica: String): ResponseEntity<Any> {
        return if (service.getRestauranteById(cedulaJuridica) != null) {
            service.deleteRestaurante(cedulaJuridica)
            ResponseEntity.ok().build()
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Restaurante no encontrado"))
        }
    }

    @GetMapping("/restaurantes")
    fun getAllRestaurantes(): ResponseEntity<List<Restaurante>> {
        return ResponseEntity.ok(service.getAllRestaurantes())
    }

    // ========== COMBO ==========
    @GetMapping("/combos/{id}")
    fun getComboById(@PathVariable id: Long): ResponseEntity<Any> {
        return service.getComboById(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(mapOf("mensaje" to "Combo no encontrado"))
    }

    @PostMapping("/combos")
    fun createCombo(@RequestBody combo: Combo): ResponseEntity<Combo> {
        return ResponseEntity.ok(service.saveCombo(combo))
    }

    @PutMapping("/combos/{id}")
    fun updateCombo(@PathVariable id: Long, @RequestBody combo: Combo): ResponseEntity<Any> {
        return if (service.getComboById(id) != null) {
            ResponseEntity.ok(service.saveCombo(combo))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Combo no encontrado"))
        }
    }

    @DeleteMapping("/combos/{id}")
    fun deleteCombo(@PathVariable id: Long): ResponseEntity<Any> {
        return if (service.getComboById(id) != null) {
            service.deleteCombo(id)
            ResponseEntity.ok().build()
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Combo no encontrado"))
        }
    }

    @GetMapping("/combos")
    fun getAllCombos(): ResponseEntity<List<Combo>> {
        return ResponseEntity.ok(service.getAllCombos())
    }

    @GetMapping("/restaurantes/{restauranteId}/combos")
    fun getCombosByRestaurante(@PathVariable restauranteId: String): ResponseEntity<List<Combo>> {
        return ResponseEntity.ok(service.getCombosByRestaurante(restauranteId))
    }

    // ========== PEDIDO ==========
    @GetMapping("/pedidos/{id}")
    fun getPedidoById(@PathVariable id: Long): ResponseEntity<Any> {
        return service.getPedidoById(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(mapOf("mensaje" to "Pedido no encontrado"))
    }

    @PostMapping("/pedidos")
    fun createPedido(@RequestBody pedido: Pedido): ResponseEntity<Pedido> {
        return ResponseEntity.ok(service.savePedido(pedido))
    }

    @PutMapping("/pedidos/{id}")
    fun updatePedido(@PathVariable id: Long, @RequestBody pedido: Pedido): ResponseEntity<Any> {
        return if (service.getPedidoById(id) != null) {
            ResponseEntity.ok(service.savePedido(pedido))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Pedido no encontrado"))
        }
    }

    @DeleteMapping("/pedidos/{id}")
    fun deletePedido(@PathVariable id: Long): ResponseEntity<Any> {
        return if (service.getPedidoById(id) != null) {
            service.deletePedido(id)
            ResponseEntity.ok().build()
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Pedido no encontrado"))
        }
    }

    @GetMapping("/pedidos")
    fun getAllPedidos(): ResponseEntity<List<Pedido>> {
        return ResponseEntity.ok(service.getAllPedidos())
    }

    @GetMapping("/clientes/{clienteId}/pedidos")
    fun getPedidosByCliente(@PathVariable clienteId: String): ResponseEntity<List<Pedido>> {
        return ResponseEntity.ok(service.getPedidosByCliente(clienteId))
    }

    @GetMapping("/restaurantes/{restauranteId}/pedidos")
    fun getPedidosByRestaurante(@PathVariable restauranteId: String): ResponseEntity<List<Pedido>> {
        return ResponseEntity.ok(service.getPedidosByRestaurante(restauranteId))
    }

    @GetMapping("/repartidores/{repartidorId}/pedidos")
    fun getPedidosByRepartidor(@PathVariable repartidorId: String): ResponseEntity<List<Pedido>> {
        return ResponseEntity.ok(service.getPedidosByRepartidor(repartidorId))
    }

    @GetMapping("/pedidos/estado/{estado}")
    fun getPedidosByEstado(@PathVariable estado: String): ResponseEntity<List<Pedido>> {
        return ResponseEntity.ok(service.getPedidosByEstado(estado))
    }

    // ========== PEDIDO_COMBO ==========
    @GetMapping("/pedidos/{pedidoId}/combos/{comboId}")
    fun getPedidoComboById(
        @PathVariable pedidoId: Long,
        @PathVariable comboId: Long
    ): ResponseEntity<Any> {
        return service.getPedidoComboById(pedidoId, comboId)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(mapOf("mensaje" to "Relación Pedido-Combo no encontrada"))
    }

    @PostMapping("/pedidos/{pedidoId}/combos")
    fun addComboToPedido(
        @PathVariable pedidoId: Long,
        @RequestBody pedidoCombo: PedidoCombo
    ): ResponseEntity<PedidoCombo> {
        pedidoCombo.pedidoId = pedidoId
        return ResponseEntity.ok(service.savePedidoCombo(pedidoCombo))
    }

    @PutMapping("/pedidos/{pedidoId}/combos/{comboId}")
    fun updatePedidoCombo(
        @PathVariable pedidoId: Long,
        @PathVariable comboId: Long,
        @RequestBody pedidoCombo: PedidoCombo
    ): ResponseEntity<Any> {
        return if (service.getPedidoComboById(pedidoId, comboId) != null) {
            pedidoCombo.pedidoId = pedidoId
            pedidoCombo.comboId = comboId
            ResponseEntity.ok(service.savePedidoCombo(pedidoCombo))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Relación Pedido-Combo no encontrada"))
        }
    }

    @DeleteMapping("/pedidos/{pedidoId}/combos/{comboId}")
    fun removeComboFromPedido(
        @PathVariable pedidoId: Long,
        @PathVariable comboId: Long
    ): ResponseEntity<Any> {
        return if (service.getPedidoComboById(pedidoId, comboId) != null) {
            service.deletePedidoCombo(pedidoId, comboId)
            ResponseEntity.ok().build()
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Relación Pedido-Combo no encontrada"))
        }
    }

    @GetMapping("/pedidos/{pedidoId}/combos")
    fun getCombosByPedido(@PathVariable pedidoId: Long): ResponseEntity<List<PedidoCombo>> {
        return ResponseEntity.ok(service.getCombosByPedido(pedidoId))
    }

    @GetMapping("/combos/{comboId}/pedidos")
    fun getPedidosByCombo(@PathVariable comboId: Long): ResponseEntity<List<PedidoCombo>> {
        return ResponseEntity.ok(service.getPedidosByCombo(comboId))
    }

    // ========== QUEJA ==========
    @GetMapping("/quejas/{id}")
    fun getQuejaById(@PathVariable id: Long): ResponseEntity<Any> {
        return service.getQuejaById(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(mapOf("mensaje" to "Queja no encontrada"))
    }

    @PostMapping("/quejas")
    fun createQueja(@RequestBody queja: Queja): ResponseEntity<Queja> {
        return ResponseEntity.ok(service.saveQueja(queja))
    }

    @PutMapping("/quejas/{id}")
    fun updateQueja(@PathVariable id: Long, @RequestBody queja: Queja): ResponseEntity<Any> {
        return if (service.getQuejaById(id) != null) {
            ResponseEntity.ok(service.saveQueja(queja))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Queja no encontrada"))
        }
    }

    @DeleteMapping("/quejas/{id}")
    fun deleteQueja(@PathVariable id: Long): ResponseEntity<Any> {
        return if (service.getQuejaById(id) != null) {
            service.deleteQueja(id)
            ResponseEntity.ok().build()
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("mensaje" to "Queja no encontrada"))
        }
    }

    @GetMapping("/quejas")
    fun getAllQuejas(): ResponseEntity<List<Queja>> {
        return ResponseEntity.ok(service.getAllQuejas())
    }

    @GetMapping("/clientes/{clienteId}/quejas")
    fun getQuejasByCliente(@PathVariable clienteId: String): ResponseEntity<List<Queja>> {
        return ResponseEntity.ok(service.getQuejasByCliente(clienteId))
    }

    @GetMapping("/repartidores/{repartidorId}/quejas")
    fun getQuejasByRepartidor(@PathVariable repartidorId: String): ResponseEntity<List<Queja>> {
        return ResponseEntity.ok(service.getQuejasByRepartidor(repartidorId))
    }

    @GetMapping("/pedidos/{pedidoId}/quejas")
    fun getQuejasByPedido(@PathVariable pedidoId: Long): ResponseEntity<Queja> {
        return ResponseEntity.ok(service.getQuejasByPedido(pedidoId))
    }

    // ========== FACTURA ==========
    @GetMapping("/facturas/{id}")
    fun getFacturaById(@PathVariable id: Long): ResponseEntity<Any> {
        return service.getFacturaById(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(mapOf("mensaje" to "Factura no encontrada"))
    }

    @GetMapping("/facturas")
    fun getAllFacturas(): ResponseEntity<List<Factura>> {
        return ResponseEntity.ok(service.getAllFacturas())
    }

    @GetMapping("/clientes/{clienteId}/facturas")
    fun getFacturasByCliente(@PathVariable clienteId: String): ResponseEntity<List<Factura>> {
        return ResponseEntity.ok(service.getFacturasByCliente(clienteId))
    }

    @GetMapping("/restaurantes/{restauranteId}/facturas")
    fun getFacturasByRestaurante(@PathVariable restauranteId: String): ResponseEntity<List<Factura>> {
        return ResponseEntity.ok(service.getFacturasByRestaurante(restauranteId))
    }
}