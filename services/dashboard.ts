export async function DashboardCardGet() {
    const token = localStorage.getItem("token")
  
    const response = await fetch("http://localhost:5099/api/dashboard/cards", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      throw new Error("Erro ao buscar cards")
    }
      return response.json()
  }
  export async function DashboardGraficoGet() {
    const token = localStorage.getItem("token")
  
    const response = await fetch("http://localhost:5099/api/dashboard/graficos", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      throw new Error("Erro ao buscar graficos")
    }
      return response.json()
  }
  export async function DashboardListaGet() {
    const token = localStorage.getItem("token")
  
    const response = await fetch("http://localhost:5099/api/dashboard/listas", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      throw new Error("Erro ao buscar listas")
    }
      return response.json()
  }