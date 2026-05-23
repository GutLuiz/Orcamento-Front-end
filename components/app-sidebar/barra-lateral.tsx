"use client";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"
  
  import { LayoutDashboard, ArrowLeftRight, Tags, Wallet, User2, LogOut } from "lucide-react"
  import { Button } from "@/components/ui/button"

  // servico
  import { logoutRequest } from "@/services/autenticacao";

  
  export function AppSidebar() {
    const pathname = usePathname()
    const router = useRouter()

    async function handleSair() {
      try {
          await logoutRequest()
      } finally {
          // mesmo se a requisição falhar, limpa o storage e redireciona
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          router.replace("/")
      }
  }

    const itens = [
      {
        href: "/orcamento/",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        href: "/orcamento/transacoes",
        label: "Transações",
        icon: ArrowLeftRight,
      },
      {
        href: "/orcamento/categoria",
        label: "Categorias",
        icon: Tags,
      },
    ]

    const isItemAtivo = (href: string) => {
      if (href === "/orcamento/") return pathname === "/orcamento"
      return pathname.startsWith(href)
    }

    return (
      <Sidebar className="[--sidebar:oklch(1_0_0)] [--sidebar-foreground:oklch(0.24_0.01_165)] [--sidebar-accent:oklch(0.95_0.03_155)] [--sidebar-accent-foreground:oklch(0.24_0.01_165)] [--sidebar-border:oklch(0.9_0.01_165)] border-r border-sidebar-border">
        <SidebarHeader>
          <Link
            href="/orcamento"
            className="flex items-center gap-3 border-b border-sidebar-border px-3 py-3 transition-opacity hover:opacity-90"
          >
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-900 via-emerald-700 to-emerald-400 shadow-sm ring-1 ring-emerald-950/10"
              aria-hidden
            >
              <Wallet className="size-5 text-white" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-base font-bold leading-tight tracking-tight text-sidebar-foreground">
                Organiza Aí
              </p>
              <p className="truncate text-[10px] font-medium uppercase tracking-[0.2em] text-sidebar-foreground/45">
                Orçamento
              </p>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {itens.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isItemAtivo(item.href)}
                      className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground p-5"
                    >
                      <Link href={item.href}>
                        <Icon />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border p-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/40 px-3 py-2.5">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-muted to-muted/60 text-muted-foreground ring-1 ring-border/80"
                aria-hidden
              >
                <User2 className="size-[18px]" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-semibold leading-tight text-sidebar-foreground">
                   Bem vindo!
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full cursor-pointer justify-center gap-2 text-muted-foreground hover:text-destructive"
              onClick={handleSair}
            >
              <LogOut className="size-4" />
                Sair
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    )
  }