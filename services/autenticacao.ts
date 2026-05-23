import { apiFetch } from "./api"

export async function loginRequest(email: string, password: string) {
  const response = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })

  return response.json() 
}
  
export async function RegisterRequest(email: string, password: string) {
  return apiFetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

export async function logoutRequest() {
  const refreshToken = localStorage.getItem("refreshToken")

  await apiFetch("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
  })
}