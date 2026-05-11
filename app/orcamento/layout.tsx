import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar/barra-lateral"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-svh flex-1 flex-col bg-muted/30">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6 lg:px-8">
          <SidebarTrigger className="-ml-1" />
          <span className="text-sm font-medium text-muted-foreground">
            Orçamento
          </span>
        </header>
        <div className="flex-1 px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}