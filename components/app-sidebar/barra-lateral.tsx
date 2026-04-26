"use-client";
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
                  <a href="/">
                    <LayoutDashboard />
                    Dashboard
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
  
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/transacoes">
                    <CreditCard />
                    Transações
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
  
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/orcamento/categoria">
                    <Tags />
                    Categorias
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
  
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
  
        <SidebarFooter />
      </Sidebar>
    )
  }