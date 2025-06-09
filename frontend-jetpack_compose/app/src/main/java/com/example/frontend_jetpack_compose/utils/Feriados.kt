package com.example.frontend_jetpack_compose.utils

import android.os.Build
import androidx.annotation.RequiresApi
import java.time.LocalDate

object FeriadosHelper {
    @RequiresApi(Build.VERSION_CODES.O)
    private val feriados = listOf(
        LocalDate.of(2025, 1, 1),   // Año Nuevo
        LocalDate.of(2025, 4, 17),  // Jueves Santo
        // Agregar más fechas según requerimiento...
    )

    @RequiresApi(Build.VERSION_CODES.O)
    fun esFeriado(fecha: LocalDate = LocalDate.now()): Boolean {
        return feriados.any { it == fecha }
    }
}