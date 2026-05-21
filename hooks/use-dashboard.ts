import { useEffect, useState } from "react"

//servicos
import { DashboardCardGet, DashboardGraficoGet, DashboardListaGet } from "@/services/dashboard";
//type
import { GastosPorCategoria, TransacoesType } from "@/types/transacoesType";


export function UseDashboard(mes: number, ano: number) {
    //cards
    const [receitas, setReceitas] = useState(0);
    const [despesas, setDespesas] = useState(0);
    const [saldo, setSaldo] = useState(0);
    //grafico
    const [gastosCategoriaDespesas, setGastosCategoriaDespesas] = useState<GastosPorCategoria[]>([]);
    const [gastosCategoriaReceitas, setGastosCategoriaReceitas] = useState<GastosPorCategoria[]>([]);
    //lista
    const [listaTransacoesRecentes, setListaTransacoesRecentes] = useState<TransacoesType[]>([]);
    const [listaTransacoesMaiores, setListaTransacoesMaiores] = useState<TransacoesType[]>([]);


    // funcao card
    async function fetchCards() {
        const dataCard = await DashboardCardGet(mes, ano)

        if (dataCard) {
            setReceitas(dataCard.receita || 0);
            setDespesas(dataCard.despesa || 0);
            setSaldo(dataCard.saldoAtual || 0);
        }
    }
    async function fetchGrafico(){
        const dataGrafico = await DashboardGraficoGet(mes, ano);

        if(dataGrafico){
          setGastosCategoriaDespesas(dataGrafico.dadosDespesas || []);
          setGastosCategoriaReceitas(dataGrafico.dadosReceitas || []);
        }
    }
    async function fetchLista(){
        const dataLista = await DashboardListaGet(mes, ano);

        if (dataLista) {
            setListaTransacoesRecentes(dataLista.dadosRecentes)
            setListaTransacoesMaiores(dataLista.dadosMaiores)
        } 
    }

    useEffect(() => {
        fetchCards();
        fetchGrafico();
        fetchLista();
    }, [mes, ano]);


    return {
        receitas,
        despesas,
        saldo,
        gastosCategoriaDespesas,
        gastosCategoriaReceitas,
        listaTransacoesRecentes,
        listaTransacoesMaiores
    }

}