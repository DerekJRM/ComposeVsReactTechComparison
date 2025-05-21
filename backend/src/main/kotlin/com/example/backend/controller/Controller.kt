package com.example.backend.controller

import com.example.backend.service.IService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class Controller(
    private val iService: IService
) {
    // Define your endpoints here
    // For example:
    // @GetMapping("/example")
    // fun getExample(): ResponseEntity<ExampleResponse> {
    //     return ResponseEntity.ok(iService.getExample())
    // }


}