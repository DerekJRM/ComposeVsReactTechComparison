package com.example.backend.controller

import com.example.backend.repository.RepositoryCarrito
import com.example.backend.repository.RepositoryUsuario
import com.example.backend.service.IService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class Controller(
    private val iService: IService,
    private val repositoryCarrito: RepositoryCarrito,
    private val repositoryUsuario: RepositoryUsuario
) {
    @GetMapping("/obtenerUsuarios")
    fun getExample(): ResponseEntity<Any> {
        return ResponseEntity.ok(repositoryUsuario.findAll())
    }



}