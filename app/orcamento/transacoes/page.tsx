"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

// icones
import { Plus, MoreHorizontalIcon,Pencil,Trash2 } from "lucide-react"

//servico
import { TransacaoDelete, TransacaoGet } from "@/services/transacoes"
// Types

// componentes 
import { Titulos } from "@/components/titulos/titulo"
import { ModalTransacao } from "@/components/dialogo/modal-transacao"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"

export default function Transacoes(){
    const [open, setOpen] = useState(false);
    
    const [transacao, setTransacao] = useState<any[]>([]);

    // Get
    async function GetTransacao() {
        try{
            const data = await TransacaoGet();
            setTransacao(data);
        }catch (error){
            console.log("Erro ao buscar transacoes")
        }
    }
    // delete
    async function handleDelete(id: number) {
        try {
          await TransacaoDelete(id)
      
          setTransacao((prev) => prev?.filter((cat) => cat.id !== id))
      
        } catch (error) {
          console.log("Erro ao deletar")
        }
    }

    useEffect(() => {
        GetTransacao()
    }, [])

    return(
        <main>
            <section>
            <Titulos 
                tituloPrincial="Transações" 
                subtitulo="5 transacoes feitas"
                button="Nova Transacao"
                icon = {<Plus/>}
                onClick={() => setOpen(true)}
            />
            </section>
            <section>

            </section>
            <section>
            <ModalTransacao
                open={open}
                setOpen={setOpen}
            />
            </section>
            <section className="w-full max-w-6xl mx-auto px-4 py-6">
                <div className="rounded-2xl border bg-background overflow-hidden">

                <Table>

                <TableHeader>
                    <TableRow>

                    <TableHead>Nome</TableHead>

                    <TableHead>Categoria</TableHead>

                    <TableHead>Data</TableHead>

                    <TableHead>Tipo</TableHead>

                    <TableHead className="text-right">
                        Valor
                    </TableHead>

                    <TableHead className="text-right">
                        Ações
                    </TableHead>

                    </TableRow>
                </TableHeader>

                <TableBody>
                    {transacao.map((transacao) => (

                    <TableRow key={transacao.id}>

                        <TableCell className="font-medium">
                        {transacao.title}
                        </TableCell>

                        <TableCell>
                        {transacao.categoryName}
                        </TableCell>

                        <TableCell>
                        {new Date(transacao.date).toLocaleDateString("pt-BR")}
                        </TableCell>

                        <TableCell>

                        <span
                            className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${
                                transacao.type === 1
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                            `}
                        >
                            {transacao.type === 1
                            ? "Receita"
                            : "Despesa"}
                        </span>

                        </TableCell>

                        <TableCell className="text-right font-semibold">

                        <span
                            className={
                            transacao.type === 1
                                ? "text-green-600"
                                : "text-red-500"
                            }
                        >
                            R$ {transacao.amount.toFixed(2)}
                        </span>

                        </TableCell>

                        <TableCell className="text-right">

                        <DropdownMenu>

                                <DropdownMenuTrigger asChild>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8"
                                >
                                    <MoreHorizontalIcon />
                                </Button>

                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">

                                <DropdownMenuItem
                                    onClick={() => handleEdit(transacao)}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={() => handleDelete(transacao.id)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                </DropdownMenuItem>

                                </DropdownMenuContent>

                            </DropdownMenu>

                            </TableCell>

                        </TableRow>

                        ))}

                    </TableBody>

                    </Table>

                </div>
            </section>
        </main>
       
    )
}