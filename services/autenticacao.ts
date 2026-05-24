import { apiFetch } from "./api"

export async function loginRequest(email: string, password: string) {
  const response = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
      const msg = await response.text()
      throw new Error(msg || "Email ou senha inválidos")
  }

  return response.json() 
}
  
export async function RegisterRequest(email: string, password: string) {
  const response = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
  })
  if (response.status === 400) throw new Error("usuario_existente")
  if (!response.ok) throw new Error(`Erro ao registrar: ${response.status}`)
  return response.text() // backend retorna string "Usuário criado com sucesso."
}


export async function logoutRequest() {
  const refreshToken = localStorage.getItem("refreshToken")

  await apiFetch("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
  })
}