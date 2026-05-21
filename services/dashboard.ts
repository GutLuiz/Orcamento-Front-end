export async function DashboardCardGet(mes?: number, ano?: number) {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams();
  if (mes !== undefined) params.append("mes", String(mes + 1));
  if (ano !== undefined) params.append("ano", String(ano));

  const response = await fetch(`http://localhost:5099/api/dashboard/cards?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar cards");
  }

  return response.json();
}
  export async function DashboardGraficoGet(mes?: number, ano?: number) {
    const token = localStorage.getItem("token")
    const params = new URLSearchParams();
    if (mes !== undefined) params.append("mes", String(mes + 1));
    if (ano !== undefined) params.append("ano", String(ano));
  
    const response = await fetch(`http://localhost:5099/api/dashboard/graficos?${params}`, {
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
  export async function DashboardListaGet(mes?: number, ano?: number) {
    const token = localStorage.getItem("token")
    const params = new URLSearchParams();
    if (mes !== undefined) params.append("mes", String(mes + 1));
    if (ano !== undefined) params.append("ano", String(ano));
  
    const response = await fetch(`http://localhost:5099/api/dashboard/listas?${params}`, {
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