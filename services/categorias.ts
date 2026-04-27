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
  