"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  
  import { LayoutDashboard, CreditCard, Tags } from "lucide-react"

  
  export function AppSidebar() {
    const pathname = usePathname()

    const itens = [
      {
        href: "/orcamento/",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        href: "/orcamento/transacoes",
        label: "Transações",
        icon: CreditCard,
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
          <div className="flex items-center justify-center border-b border-sidebar-border px-3 py-3">
            <span className="text-sm font-semibold tracking-wide text-sidebar-foreground">
                Minha Empresa
            </span>
          </div>
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
                      className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground"
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
        <SidebarFooter />
      </Sidebar>
    )
  }