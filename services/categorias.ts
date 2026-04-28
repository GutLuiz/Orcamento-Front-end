export async function CategoriaPost(name: string) {
    const token = localStorage.getItem("token") 
    const response = await fetch("http://localhost:5099/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name
      }),
    })
    if (!response.ok) {
      throw new Error("Erro ao fazer o post de categorias")
    }
    return response.json()
  }
  
  export async function CategoriaGet() {
    const token = localStorage.getItem("token")
  
    const response = await fetch("http://localhost:5099/categories", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      throw new Error("Erro ao buscar categorias")
    }
  
    return response.json()
  }
  export async function CategoriaDelete(id: number) {
    const token = localStorage.getItem("token")
  
    const response = await fetch(`http://localhost:5099/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      throw new Error("Erro ao deletar categoria")
    }
  }
  export async function CategoriaPut(id: number, categoria: string) {
    const token = localStorage.getItem("token")
  
    const response = await fetch(`http://localhost:5099/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: categoria,
      }),
    })
  
    if (!response.ok) {
      throw new Error("Erro ao atualizar categoria")
    }
  }