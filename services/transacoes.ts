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