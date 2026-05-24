const BASE_URL = "http://localhost:5099"

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("accessToken")

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    })

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`)
    }

    return response // <-- retorna o response, quem chama decide se é .json() ou .text()
}