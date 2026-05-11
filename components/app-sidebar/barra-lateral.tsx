"use client";
import Link from "next/link"
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
  
  import { LayoutDashboard, CreditCard, Tags, Wallet } from "lucide-react"

  
  export function AppSidebar() {
    return (
      <Sidebar className="[--sidebar:oklch(0.62_0.14_155)] [--sidebar-foreground:oklch(0.98_0_0)] [--sidebar-accent:oklch(0.56_0.13_155)] [--sidebar-accent-foreground:oklch(0.98_0_0)] [--sidebar-border:oklch(0.46_0.10_155)] border-r border-sidebar-border">
        <SidebarHeader>
          <div className="flex items-center gap-3 rounded-lg bg-emerald-800/25 px-3 py-2">
            <Wallet size={18} />
            <span className="text-sm font-semibold tracking-wide text-white">
                App Site
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent/80 data-[active=true]:text-sidebar-accent-foreground">
                <Link href="/orcamento/">
                  <LayoutDashboard />
                  Dashboard
                </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent/80 data-[active=true]:text-sidebar-accent-foreground">
                  <Link href="/orcamento/transacoes">
                    <CreditCard />
                    Transações
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent/80 data-[active=true]:text-sidebar-accent-foreground">
                  <Link href="/orcamento/categoria">
                    <Tags />
                    Categorias
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }