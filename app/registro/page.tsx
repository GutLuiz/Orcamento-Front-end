"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { toast } from "sonner"

//servicos
import { RegisterRequest, loginRequest } from "@/services/autenticacao"

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


export default function Registro() {
  const router = useRouter();
     // constantes testes de login
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

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
      await RegisterRequest(email, password)

      const { accessToken, refreshToken } = await loginRequest(email, password)

      localStorage.clear()
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)

      toast.success("Conta criada com sucesso!")
      router.push("/orcamento/")

    } catch (error: any) {
      if (error.message === "usuario_existente") {
        toast.error("Este e-mail já está cadastrado")
      } else {
        toast.error("Erro ao criar conta, tente novamente")
      }
    } finally {
      setIsLoading(false)
    }
  }

 
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Registre sua Conta!</CardTitle>
          <CardDescription>
                Adicione seu Email e Senha
          </CardDescription>
          <CardAction>
                <Link href="/">
                    <Button variant="link">Login</Button>
                </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="Register-form" onSubmit={handleRegister}>
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
          <Button type="submit" form="Register-form" className="w-full">
            Registrar
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
