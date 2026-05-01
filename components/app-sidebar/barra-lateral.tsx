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
      <Sidebar>
        <SidebarHeader  >
          <div className="flex items-center gap-3">
            <Wallet size={18} />
            <span className="">
                Orçamento
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild >
                <Link href="/">
                  <LayoutDashboard />
                  Dashboard
                </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/orcamento/transacoes">
                    <CreditCard />
                    Transações
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
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