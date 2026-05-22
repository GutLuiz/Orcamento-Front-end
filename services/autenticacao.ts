import { apiFetch } from "./api"

export async function loginRequest(email: string, password: string) {
    return apiFetch("/auth/login", {
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