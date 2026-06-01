"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { loginRequest } from "@/services/autenticacao"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Lock, ArrowRight, Wallet } from "lucide-react"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
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
      const data = await loginRequest(email, password)

      localStorage.clear()
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)

      toast.success("Login realizado com sucesso!")
      router.push("/orcamento/")
    } catch {
      toast.error("E-mail ou senha inválidos")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">

        {/* header */}
        <div className="border-b border-border/80 px-8 pb-6 pt-8">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium">Orçamento</span>
            </div>
            <Link
              href="/registro"
              className="flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
            >
              Criar conta
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <h1 className="text-xl font-medium">Bem-vindo de volta</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Entre com seu e-mail e senha para continuar.
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 px-8 py-6">

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-medium">
                Senha
              </label>
              <a href="#" className="text-xs text-muted-foreground transition hover:text-foreground">
                Esqueceu a senha?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button type="submit" className="mt-1 w-full gap-2" disabled={isLoading}>
            {isLoading ? "Entrando..." : (
              <>
                Entrar
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

        </form>
      </div>
    </main>
  )
}