"use client"
import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

// servicos 
import {
  CategoriaPost,
  CategoriaGet,
  CategoriaDelete,
  CategoriaPut,
} from "@/services/categorias"

// compoenentes
import { Titulos } from "@/components/titulos/titulo"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialogo } from "@/components/dialogo/modal-categoria"
import { Button } from "@/components/ui/button"

//types
import { CategoriaItem } from "@/types/categoriaType"


export default function Categoria() {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [categoriaEdit, setCategoriaEdit] = useState("")
  const [categoriaIdEdit, setCategoriaIdEdit] = useState<number | null>(null)
  const [categoriaPost, setCategoriaPost] = useState("")
  const [categorias, setCategorias] = useState<CategoriaItem[]>([])

  async function PostCategoria(e: React.FormEvent) {
    e.preventDefault()

    if (!categoriaPost.trim()) {
      toast.error("Preencha o nome da categoria")
      return
    }

    if (categoriaPost.trim().length < 2) {
      toast.error("O nome deve ter pelo menos 2 caracteres")
      return
    }

    const jaExiste = categorias.some(
      (c) => c.name.toLowerCase() === categoriaPost.trim().toLowerCase()
    )
    if (jaExiste) {
      toast.error("Já existe uma categoria com esse nome")
      return
    }

    try {
      await CategoriaPost(categoriaPost.trim())
      setCategoriaPost("")
      setOpen(false)
      await fetchCategorias()
      toast.success("Categoria criada com sucesso!")
    } catch {
      toast.error("Erro ao criar categoria")
    }
  }

  async function fetchCategorias() {
    try {
      const data = await CategoriaGet()
      setCategorias(Array.isArray(data) ? data : [])
    } catch {
      toast.error("Erro ao buscar categorias")
    }
  }

  async function handleDelete(id: number) {
    try {
      await CategoriaDelete(id)
      setCategorias((prev) => prev.filter((cat) => cat.id !== id))
      toast.success("Categoria removida")
    } catch {
      toast.error("Erro ao deletar categoria")
    }
  }

  async function handlePut(e: React.FormEvent) {
    e.preventDefault()

    if (!categoriaIdEdit) return

    if (!categoriaEdit.trim()) {
      toast.error("Preencha o nome da categoria")
      return
    }

    if (categoriaEdit.trim().length < 2) {
      toast.error("O nome deve ter pelo menos 2 caracteres")
      return
    }

    const jaExiste = categorias.some(
      (c) => c.name.toLowerCase() === categoriaEdit.trim().toLowerCase() && c.id !== categoriaIdEdit
    )
    if (jaExiste) {
      toast.error("Já existe uma categoria com esse nome")
      return
    }

    try {
      await CategoriaPut(categoriaIdEdit, categoriaEdit.trim())
      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === categoriaIdEdit ? { ...cat, name: categoriaEdit.trim() } : cat
        )
      )
      setOpenEdit(false)
      setCategoriaEdit("")
      setCategoriaIdEdit(null)
      toast.success("Categoria atualizada!")
    } catch {
      toast.error("Erro ao atualizar categoria")
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  const count = categorias.length
  const subtitulo =
    count === 0
      ? "Nenhuma categoria cadastrada"
      : count === 1
        ? "1 categoria cadastrada e seu movimento mensal"
        : `${count} categorias cadastradas e seus movimentos mensais`

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <Titulos
        tituloPrincial="Categorias"
        subtitulo={subtitulo}
        button="Nova categoria"
        icon={<Plus className="size-4" />}
        onClick={() => setOpen(true)}
      />

      <section>
        {categorias.length === 0 ? (
          <div className="rounded-xl border border-border/80 bg-card p-10 text-center text-muted-foreground shadow-sm">
            Nenhuma categoria ainda. Clique em "Nova categoria" para começar.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categorias.map((c) => (
              <Card
                key={c.id}
                className="group rounded-xl border-border/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-sm font-semibold">
                      {c.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-base">{c.name}</CardTitle>
                    </div>
                  </div>

                  <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      onClick={() => {
                        setCategoriaEdit(c.name)
                        setCategoriaIdEdit(c.id)
                        setOpenEdit(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(c.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex items-center justify-between border-t pt-3">
                  <span className="text-xs text-muted-foreground">Movimentado</span>
                  <span className="text-sm font-semibold text-foreground">
                    R${c.movimentacaoMensal}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Dialogo
        titulo="Nova Categoria"
        open={open}
        setOpen={setOpen}
        onSubmit={PostCategoria}
      >
        <div>
          <h2 className="mb-1 text-sm">Nome</h2>
          <Input
            value={categoriaPost}
            onChange={(e) => setCategoriaPost(e.target.value)}
            placeholder="Nome da categoria"
          />
        </div>
      </Dialogo>

      <Dialogo
        titulo="Editar Categoria"
        open={openEdit}
        setOpen={setOpenEdit}
        onSubmit={handlePut}
      >
        <div>
          <h2 className="mb-1 text-sm">Nome</h2>
          <Input
            value={categoriaEdit}
            onChange={(e) => setCategoriaEdit(e.target.value)}
            placeholder="Editar categoria"
          />
        </div>
      </Dialogo>
    </div>
  )
}