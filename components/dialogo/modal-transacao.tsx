"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// serviços
import { CategoriaGet } from "@/services/categorias"
import {
  TransacaoPost,
  TransacaoPut,
} from "@/services/transacoes"

// componentes
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"

interface Transacao {
  id: number
  title: string
  amount: number
  type: number
  date: string
  categoryId: number
}

interface ModalTransacaoProps {
  open: boolean
  setOpen: (open: boolean) => void

  modo: "create" | "edit"

  transacao?: Transacao | null
}

export function ModalTransacao({
  open,
  setOpen,
  modo,
  transacao,
}: ModalTransacaoProps) {

  const [categorias, setCategorias] = useState<any[]>([])

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("")

  const [categoriaId, setCategoriaId] =
    useState<number | null>(null)

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState<Date>()
  const [type, setType] = useState(0)

  // carregar categorias
  async function fetchCategorias() {
    try {

      const data = await CategoriaGet()

      setCategorias(data)

    } catch (error) {

      console.log("Erro ao buscar categorias")

    }
  }

  // preencher modal quando editar
  useEffect(() => {

    if (modo === "edit" && transacao) {

      setTitle(transacao.title)

      setAmount(String(transacao.amount))

      setType(transacao.type)

      setCategoriaId(transacao.categoryId)

      setDate(new Date(transacao.date))

      const categoria = categorias.find(
        (c) => c.id === transacao.categoryId
      )

      if (categoria) {
        setCategoriaSelecionada(categoria.name)
      }

    }

    // limpar modal no create
    if (modo === "create") {

      setTitle("")
      setAmount("")
      setType(0)
      setCategoriaId(null)
      setCategoriaSelecionada("")
      setDate(undefined)

    }

  }, [modo, transacao, open, categorias])

  // buscar categorias
  useEffect(() => {
    fetchCategorias()
  }, [])

  // submit
  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()

    if (!categoriaId) {
      alert("Selecione uma categoria")
      return
    }

    if (!date) {
      alert("Selecione uma data")
      return
    }

    try {

      // CREATE
      if (modo === "create") {

        await TransacaoPost(
          title,
          Number(amount),
          type,
          date.toISOString(),
          categoriaId
        )

        console.log("Transação criada")

      }

      // EDIT
      if (modo === "edit" && transacao) {

        await TransacaoPut(
          transacao.id,
          title,
          Number(amount),
          type,
          date.toISOString(),
          categoriaId
        )

        console.log("Transação atualizada")

      }

      setOpen(false)

    } catch (error) {

      console.log("Erro ao salvar transação")

    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="sm:max-w-md rounded-3xl">

        <DialogHeader>

          <DialogTitle className="text-2xl font-bold">

            {modo === "create"
              ? "Nova transação"
              : "Editar transação"}

          </DialogTitle>

          <DialogDescription>

            {modo === "create"
              ? "Registre receitas ou despesas."
              : "Atualize os dados da transação."}

          </DialogDescription>

        </DialogHeader>

        {/* tipo */}
        <div className="flex bg-muted rounded-2xl p-1">

          <button
            type="button"
            onClick={() => setType(0)}
            className={`
              flex-1 h-10 rounded-xl text-sm font-medium transition
              ${
                type === 0
                  ? "bg-background text-red-500 shadow-sm"
                  : "text-muted-foreground"
              }
            `}
          >
            Despesa
          </button>

          <button
            type="button"
            onClick={() => setType(1)}
            className={`
              flex-1 h-10 rounded-xl text-sm font-medium transition
              ${
                type === 1
                  ? "bg-background text-green-600 shadow-sm"
                  : "text-muted-foreground"
              }
            `}
          >
            Receita
          </button>

        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* nome */}
          <div>

            <h2 className="text-sm mb-2 font-medium">
              Nome
            </h2>

            <Input
              placeholder="Ex: Mercado, Salário..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          {/* valor + categoria */}
          <div className="grid grid-cols-2 gap-3">

            <div>

              <h2 className="text-sm mb-2 font-medium">
                Valor
              </h2>

              <Input
                type="number"
                placeholder="0,00"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />

            </div>

            <div>

              <h2 className="text-sm mb-2 font-medium">
                Categoria
              </h2>

              <DropdownMenu>

                <DropdownMenuTrigger asChild>

                  <Button
                    variant="outline"
                    className="w-full justify-between"
                  >

                    <div className="flex items-center gap-2">

                      {categoriaSelecionada ||
                        "Selecionar"}

                    </div>

                    <ChevronDown className="h-4 w-4" />

                  </Button>

                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">

                  {categorias.map((categoria) => (

                    <DropdownMenuItem
                      key={categoria.id}
                      onClick={() => {

                        setCategoriaSelecionada(
                          categoria.name
                        )

                        setCategoriaId(categoria.id)

                      }}
                    >

                      {categoria.name}

                    </DropdownMenuItem>

                  ))}

                </DropdownMenuContent>

              </DropdownMenu>

            </div>

          </div>

          {/* data */}
          <div>

            <h2 className="text-sm mb-2 font-medium">
              Data
            </h2>

            <Popover>

              <PopoverTrigger asChild>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >

                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {date ? (
                    format(
                      date,
                      "d 'de' MMMM 'de' yyyy",
                      { locale: ptBR }
                    )
                  ) : (
                    "Selecione uma data"
                  )}

                </Button>

              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                />

              </PopoverContent>

            </Popover>

          </div>

          {/* ações */}
          <div className="flex justify-end gap-2 pt-2">

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-800"
            >

              {modo === "create"
                ? "Salvar"
                : "Atualizar"}

            </Button>

          </div>

        </form>

      </DialogContent>

    </Dialog>
  )
}