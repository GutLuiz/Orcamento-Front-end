export async function TransacaoPost(Title: string, Amount : number, Type : number, 
    Date : string, CategoryId : number) {

    const token = localStorage.getItem("token") 
    const response = await fetch("http://localhost:5099/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        Title,
        Amount,
        Type,
        Date,
        CategoryId
      }),
    })
    if (!response.ok) {
      throw new Error("Erro ao fazer o post de transacoes")
    }
    return response.json()
  }
   
  export async function TransacaoGet(mes?: number, ano?: number) {
    const token = localStorage.getItem("token")
    const params = new URLSearchParams();
    if (mes !== undefined) params.append("mes", String(mes + 1));
    if (ano !== undefined) params.append("ano", String(ano));

    const response = await fetch(`http://localhost:5099/transactions?${params}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      throw new Error("Erro ao buscar transacoes")
    }
      return response.json()
  }

  export async function TransacaoDelete(id: number) {
    const token = localStorage.getItem("token")
  
    const response = await fetch(`http://localhost:5099/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      throw new Error("Erro ao deletar transacao")
    }
  }

  export async function TransacaoPut(id: number, Title: string, Amount: number, Type : number, Date: string, CategoryId: number) {
    const token = localStorage.getItem("token")
  
    const response = await fetch(`http://localhost:5099/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Title: Title,
        Amount : Amount,
        Type : Type,
        Date : Date,
        CategoryId : CategoryId 
      }),
    })
  
    if (!response.ok) {
      throw new Error("Erro ao atualizar transacao")
    }
  }