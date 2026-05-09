import { useEffect, useState } from "react"

//servicos
import { DashboardCardGet, DashboardGraficoGet, DashboardListaGet } from "@/services/dashboard";
//type
import { GastosPorCategoria, TransacoesType } from "@/types/transacoesType";

function pickNum(...vals: unknown[]): number {
  for (const v of vals) {
    if (v === undefined || v === null) continue
    const n = Number(v)
    if (!Number.isNaN(n)) return n
  }
  return 0
}

function pickStr(...vals: unknown[]): string {
  for (const v of vals) {
    if (v === undefined || v === null) continue
    return String(v)
  }
  return ""
}

/** Retorna string ISO (YYYY-MM-DD ou completa) para alinhar com a API e formulários. */
function parseDateField(v: unknown): string {
  if (v instanceof Date && !Number.isNaN(v.getTime())) {
    return v.toISOString().slice(0, 10)
  }
  if (typeof v === "string" || typeof v === "number") {
    const d = new Date(v)
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10)
  }
  return ""
}

/** API pode enviar camelCase ou PascalCase (.NET). */
function normalizarTransacao(raw: unknown): TransacoesType {
  const r =
    raw && typeof raw === "object"
      ? (raw as Record<string, unknown>)
      : {}

  return {
    id: pickNum(r.id, r.Id),
    title: pickStr(r.title, r.Title),
    amount: pickNum(r.amount, r.Amount, r.value, r.Value),
    type: pickNum(r.type, r.Type),
    date: parseDateField(r.date ?? r.Date),
    categoryId: pickNum(r.categoryId, r.CategoryId),
    userId: pickNum(r.userId, r.UserId),
    categoryName: pickStr(r.categoryName, r.CategoryName),
  }
}

export function UseDashboard() {
    //cards
    const [receitas, setReceitas] = useState(0);
    const [despesas, setDespesas] = useState(0);
    const [saldo, setSaldo] = useState(0);
    //grafico
    const [gastosCategoria, setGastosCategoria] = useState<GastosPorCategoria[]>([]);
    //lista
    const [listaTransacoes, setListaTransacoes] = useState<TransacoesType[]>([]);


    // funcao card
    async function fetchCards() {
        const dataCard = await DashboardCardGet()

        if (dataCard) {
            setReceitas(dataCard.receita || 0);
            setDespesas(dataCard.despesa || 0);
            setSaldo(dataCard.saldoAtual || 0);
        }
    }
    async function fetchGrafico(){
        const dataGrafico = await DashboardGraficoGet();

        if(dataGrafico){
            setGastosCategoria(dataGrafico || [])
        }
    }
    async function fetchLista(){
        const dataLista = await DashboardListaGet();

        if (Array.isArray(dataLista)) {
            setListaTransacoes(dataLista.map(normalizarTransacao))
        } else {
            setListaTransacoes([])
        }
    }

    useEffect(() => {
        fetchCards();
        fetchGrafico();
        fetchLista();
    }, []);


    return {
        receitas,
        despesas,
        saldo,
        gastosCategoria,
        listaTransacoes
    }

}