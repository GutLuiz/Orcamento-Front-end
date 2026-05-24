"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { toast } from "sonner"

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
  const [isLoading, setIsLoading] = useState(false)

  // Funcao teste de login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
       // validacoes
       if (!email.trim()) {
        toast.error("Preencha o e-mail")
        return
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        toast.error("E-mail inválido")
        return
      }
  
      if (!password.trim()) {
        toast.error("Preencha a senha")
        return
      }
  
      if (password.length < 6) {
        toast.error("A senha deve ter pelo menos 6 caracteres")
        return
      }
  
      setIsLoading(true)
    try {
        const data = await loginRequest(email, password)


        localStorage.clear(); 
        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)

        toast.success("Login realizado com sucesso!")
        router.push("/orcamento/")
    } catch (error) {
      toast.error("E-mail ou senha inválidos")
    } finally {
      setIsLoading(false)
    }
}
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6 sm:p-8 md:p-10">
      <Card className="w-full max-w-md border-border/80 shadow-md">
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
