
export async function loginRequest(email: string, password: string) {
    const response = await fetch("http://localhost:5099/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    if (!response.ok) {
      throw new Error("Erro ao fazer login")
    }
    return response.json()
  }
  
export async function RegisterRequest(email: string, password: string) {
  const response = await fetch("http://localhost:5099/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Erro ao fazer Registro")
  }

  return data
}