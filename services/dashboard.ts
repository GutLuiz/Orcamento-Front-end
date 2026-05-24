import { apiFetch } from "./api"

export async function DashboardCardGet(mes?: number, ano?: number) {
    const params = new URLSearchParams()
    if (mes !== undefined) params.append("mes", String(mes + 1))
    if (ano !== undefined) params.append("ano", String(ano))

    const response = await apiFetch(`/api/dashboard/cards?${params}`)
    if (!response.ok) throw new Error(`Erro ao buscar cards: ${response.status}`)
    return response.json()
}

export async function DashboardGraficoGet(mes?: number, ano?: number) {
    const params = new URLSearchParams()
    if (mes !== undefined) params.append("mes", String(mes + 1))
    if (ano !== undefined) params.append("ano", String(ano))

    const response = await apiFetch(`/api/dashboard/graficos?${params}`)
    if (!response.ok) throw new Error(`Erro ao buscar gráficos: ${response.status}`)
    return response.json()
}

export async function DashboardListaGet(mes?: number, ano?: number) {
    const params = new URLSearchParams()
    if (mes !== undefined) params.append("mes", String(mes + 1))
    if (ano !== undefined) params.append("ano", String(ano))

    const response = await apiFetch(`/api/dashboard/listas?${params}`)
    if (!response.ok) throw new Error(`Erro ao buscar listas: ${response.status}`)
    return response.json()
}