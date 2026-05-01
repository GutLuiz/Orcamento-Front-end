"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

// icones
import { Plus } from "lucide-react"

//servico
import { TransacaoPost } from "@/services/transacoes"

// Types
import { TransacoesType } from "@/types/transacoesType"

// componentes 
import { Titulos } from "@/components/titulos/titulo"
import { ModalTransacao } from "@/components/dialogo/modal-transacao"

export default function Transacoes(){
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState(1)
    const [date, setDate] = useState("")
    const [categoryId, setCategoryId] = useState(0)
    const [transacoesPost, setTransacoesPost] = useState<TransacoesType[]>([]);


    async function PostTransacoes(e: React.FormEvent){
        e.preventDefault()
        
        try{
            const data = await TransacaoPost(
                title,
                amount,
                type,
                date,
                categoryId
            )

        }catch(error){
            console.log("Erro ao criar transacao")
        }
    }

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
        </main>
       
    )
}