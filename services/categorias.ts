import { apiFetch } from "./api"

  export async function CategoriaPost(name: string) {
      return apiFetch("/categories", {
        method: "POST",
        body: JSON.stringify({ name}),
    })
  }
  export async function CategoriaGet() {
    return apiFetch("/categories", {
      method : "GET"
    });
  }
  export async function CategoriaDelete(id: number) {
      return apiFetch(`/categories/${id}`, {
        method: "DELETE",
    })
  }
  export async function CategoriaPut(id: number, categoria: string) {
      return apiFetch(`/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify({categoria}),
    })
  }
   
  