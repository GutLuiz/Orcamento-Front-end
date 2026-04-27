"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2} from "lucide-react";

// componentes
import { Titulos } from "@/components/titulos/titulo"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { CategoriaPost, CategoriaGet } from "@/services/categorias";


export default function Categoria() {
    
    const [open, setOpen] = useState(false);


    const [categoriaPost, setCategoriaPost] = useState("")
    const [categorias, setCategorias] = useState<any[]>([])

    async function PostCategoria(e: React.FormEvent) {
        e.preventDefault()
        
        if (!categoriaPost.trim()) {
            alert("Nome da categoria é obrigatório")
            return
        }
        try {
          const data = await CategoriaPost(categoriaPost)
          
          console.log("Categoria criada:", data)
      
          setCategoriaPost("") // limpa input
          setOpen(false)   // fecha modal
          await fetchCategorias() // atualizo as minhas categorias
      
        } catch (error) {
          console.log("Erro ao criar categoria")
        }
    }
    async function fetchCategorias() {
        try {
          const data = await CategoriaGet()
          setCategorias(data)
        } catch (error) {
          console.log("Erro ao buscar categorias")
        }
      }

      useEffect(() => {
        fetchCategorias()
      }, [])


    return(
       <main className="w-full">
        <section>
        <Titulos 
          tituloPrincial="Categorias"
          subtitulo="10 categorias cadastradas"
          button = "Nova Categoria"
          icon={<Plus/>}
          onClick={() => setOpen(true)}
          />
        </section>
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categorias.map((c, i) => (
            <Card key={i} className="group rounded-2xl shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">

                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-sm font-semibold">
                    {c.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                    <CardTitle className="text-base">{c.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                        0 transações
                    </p>
                    </div>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted">
                    <Pencil className="h-4 w-4" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-destructive/10 text-destructive">
                    <Trash2 className="h-4 w-4" />
                    </button>
                </div>

                </CardHeader>

                <CardContent className="mt-2 border-t pt-3 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                    Movimentado
                </span>
                <span className="text-sm font-semibold">
                    R$ 0,00
                </span>
                </CardContent>

            </Card>
            ))}
            </div>
        </section>
        <section>
            <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className="font-display">Nova Categoria</DialogTitle>
            </DialogHeader>
            <form onSubmit={PostCategoria} className="flex flex-col gap-4">
                <div>
                <h2 className="text-sm mb-1">Nome</h2>
                <Input
                    value={categoriaPost}
                    onChange={(e) => setCategoriaPost(e.target.value)}
                    placeholder="Nome da categoria"
                />
                </div>

                <div className="flex justify-end gap-2">

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                >
                    Cancelar
                </Button>

                <Button type="submit" className="bg-green-800">
                    Salvar
                </Button>

                </div>

                </form>
            </DialogContent>
        </Dialog>
        </section>
       </main>
    )
}