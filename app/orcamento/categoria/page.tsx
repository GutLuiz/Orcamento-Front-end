"use client"
import Link from "next/link"
import { useState } from "react"

// componentes
import { Titulos } from "@/components/titulos/titulo"

export default function Categoria() {

    return(
       <main>
          <Titulos tituloPrincial="Categorias" subtitulo="10 categorias cadastradas"/>
       </main>
    )
}