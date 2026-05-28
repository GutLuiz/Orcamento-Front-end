import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import { ServerWakeBanner } from "@/components/server-wake/server-wake-banner";

export const metadata = {
  title: "Organiza Aí",
  description: "Sistema de orçamento pessoal.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
      <ServerWakeBanner />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
