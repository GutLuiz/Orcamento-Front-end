"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";

// servicos
import { loginRequest } from "@/services/autenticacao";

// componentes
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {

  // constantes react
  const router = useRouter();
  // constantes testes de login
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Funcao teste de login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    try {
      const data = await loginRequest(email, password)
         
      if (data.token) {
        console.log("Logado!")
        localStorage.setItem("token", data.token)
        router.push("/orcamento/categoria/")
      }
      console.log("logado")
      console.log(data) 
    } catch (error) {
      console.log("erro ao logar")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Faça Login na sua Conta!</CardTitle>
          <CardDescription>
           Entre com Email e senha
          </CardDescription>
          <CardAction>
            <Link href="/registro">
              <Button variant="link">Registra-se</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form"  className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
