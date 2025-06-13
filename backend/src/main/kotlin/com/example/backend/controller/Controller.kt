package com.example.backend.controller

import com.example.backend.model.Usuario
import com.example.backend.service.IService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class Controller(
    private val service: IService,
) {
    @GetMapping("/login/{cedula}/{contrasena}")
    fun login(@PathVariable cedula: String, @PathVariable contrasena: String): ResponseEntity<Any> {
        val usuario = service.getUsuarioById(cedula)

        if (usuario != null && usuario.contrasena.equals(contrasena)) {
            usuario.contrasena = null
            return ResponseEntity.ok(usuario)
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(mapOf("mensaje" to "Credenciales inválidas"))
        }
    }

    @GetMapping("/getClienteById/{cedula}")
    fun getClienteById(@PathVariable cedula: String): ResponseEntity<Any> {
        val cliente = service.getClienteById(cedula)
        return if (cliente != null) {
            ResponseEntity.ok(cliente)
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(mapOf("mensaje" to "Cliente no encontrado"))
        }
    }

    @GetMapping("/getRepartidorById/{cedula}")
    fun getRepartidorById(@PathVariable cedula: String): ResponseEntity<Any> {
        val repartidor = service.getRepartidorById(cedula)
        return if (repartidor != null) {
            ResponseEntity.ok(repartidor)
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(mapOf("mensaje" to "Repartidor no encontrado"))
        }
    }
}