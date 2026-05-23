"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";

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

  // Funcao teste de login
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
  
    await RegisterRequest(email, password);
  
    const response = await loginRequest(email, password);
    const { accessToken, refreshToken } = await response.json();
    
    localStorage.clear(); 
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    router.push('/orcamento/');
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
