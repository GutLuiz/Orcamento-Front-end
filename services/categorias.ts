import { apiFetch } from "./api"

export async function CategoriaPost(name: string) {
    const response = await apiFetch("/categories", {
        method: "POST",
        body: JSON.stringify({ name }),
    })
    if (!response.ok) throw new Error(`Erro ao criar categoria: ${response.status}`)
    return response.json()
}

export async function CategoriaGet() {
    const response = await apiFetch("/categories")
    if (!response.ok) throw new Error(`Erro ao buscar categorias: ${response.status}`)
    return response.json()
}

export async function CategoriaDelete(id: number) {
    const response = await apiFetch(`/categories/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) throw new Error(`Erro ao deletar categoria: ${response.status}`)
    return response.ok
}

export async function CategoriaPut(id: number, name: string) {
    const response = await apiFetch(`/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
    })
    if (!response.ok) throw new Error(`Erro ao atualizar categoria: ${response.status}`)
    return response.json()
}