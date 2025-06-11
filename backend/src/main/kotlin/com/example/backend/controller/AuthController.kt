package com.example.backend.controller

import com.example.backend.model.Usuario
import com.example.backend.repository.RepositoryUsuario
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val repositoryUsuario: RepositoryUsuario
) {
    data class LoginRequest(
        val correo: String,
        val contrasena: String
    )

    data class LoginResponse(
        val id: Long?,
        val nombre: String?,
        val correo: String?,
        val rol: String,
        val mensaje: String = "Login exitoso"
    )

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequest): ResponseEntity<Any> {
        // Buscar usuario por correo
        val usuario = repositoryUsuario.findByCorreo(loginRequest.correo)

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(mapOf("mensaje" to "Credenciales inválidas"))
        }

        // Verificar contraseña (nota: en producción usa BCryptPasswordEncoder)
        if (usuario.contrasena != loginRequest.contrasena) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(mapOf("mensaje" to "Credenciales inválidas"))
        }

        // Si todo es correcto, devolver datos del usuario (sin contraseña)
        val response = LoginResponse(
            id = usuario.id,
            nombre = usuario.nombre,
            correo = usuario.correo,
            rol = usuario.rol.toString()
        )

        return ResponseEntity.ok(response)
    }
}