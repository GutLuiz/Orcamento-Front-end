import { apiFetch } from "./api"

export async function TransacaoPost(Title: string, Amount: number, Type: number, Date: string, CategoryId: number) {
    return apiFetch("/transactions", {
        method: "POST",
        body: JSON.stringify({ Title, Amount, Type, Date, CategoryId }),
    })
}

export async function TransacaoGet(mes?: number, ano?: number) {
    const params = new URLSearchParams()
    if (mes !== undefined) params.append("mes", String(mes + 1))
    if (ano !== undefined) params.append("ano", String(ano))

    return apiFetch(`/transactions?${params}`)
}

export async function TransacaoDelete(id: number) {
    return apiFetch(`/transactions/${id}`, {
        method: "DELETE",
    })
}

export async function TransacaoPut(id: number, Title: string, Amount: number,
  Type: number, Date: string, CategoryId: number) {
    return apiFetch(`/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify({ Title, Amount, Type, Date, CategoryId }),
  })
}