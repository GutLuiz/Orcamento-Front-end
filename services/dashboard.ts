import { apiFetch } from "./api"

export async function DashboardCardGet(mes?: number, ano?: number) {
    const params = new URLSearchParams()
    if (mes !== undefined) params.append("mes", String(mes + 1))
    if (ano !== undefined) params.append("ano", String(ano))

    return apiFetch(`/api/dashboard/cards?${params}`)
}

export async function DashboardGraficoGet(mes?: number, ano?: number) {
    const params = new URLSearchParams()
    if (mes !== undefined) params.append("mes", String(mes + 1))
    if (ano !== undefined) params.append("ano", String(ano))

    return apiFetch(`/api/dashboard/graficos?${params}`)
}

export async function DashboardListaGet(mes?: number, ano?: number) {
    const params = new URLSearchParams()
    if (mes !== undefined) params.append("mes", String(mes + 1))
    if (ano !== undefined) params.append("ano", String(ano))

    return apiFetch(`/api/dashboard/listas?${params}`)
}