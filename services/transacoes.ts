import { apiFetch } from "./api"

export async function TransacaoPost(Title: string, Amount: number, Type: number, Date: string, CategoryId: number) {
    const response = await apiFetch("/transactions", {
        method: "POST",
        body: JSON.stringify({ Title, Amount, Type, Date, CategoryId }),
    })
    if (!response.ok) throw new Error(`Erro ao criar transação: ${response.status}`)
    return response.json()
}

export async function TransacaoGet(mes?: number, ano?: number) {
    const params = new URLSearchParams()
    if (mes !== undefined) params.append("mes", String(mes + 1))
    if (ano !== undefined) params.append("ano", String(ano))

    const response = await apiFetch(`/transactions?${params}`)
    if (!response.ok) throw new Error(`Erro ao buscar transações: ${response.status}`)
    return response.json()
}

export async function TransacaoDelete(id: number) {
    const response = await apiFetch(`/transactions/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) throw new Error(`Erro ao deletar transação: ${response.status}`)
    return response.ok
}

export async function TransacaoPut(id: number, Title: string, Amount: number,
    Type: number, Date: string, CategoryId: number) {
      const response = await apiFetch(`/transactions/${id}`, {
          method: "PUT",
          body: JSON.stringify({ Title, Amount, Type, Date, CategoryId }),
      })
      if (!response.ok) throw new Error(`Erro ao atualizar transação: ${response.status}`)
      if (response.status === 204) return true
      return response.json()
  }