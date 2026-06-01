// components/server-wake-banner.tsx
"use client"
import { useState } from "react"
import { X, ServerCrash } from "lucide-react"

export function ServerWakeBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="w-full bg-amber-50 border-b border-amber-200 px-4 py-3 text-sm text-amber-900">
      <div className="mx-auto flex max-w-2xl items-start gap-3">
        <ServerCrash className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <div className="flex-1">
          <p className="font-medium">O servidor pode estar em hibernação 😴</p>
          <p className="mt-0.5 text-amber-800">
            Basta seguir esses passos:
          </p>
          <ol className="mt-1.5 list-decimal pl-4 space-y-0.5 text-amber-800">
            <li>Tente fazer <strong>login ou registro</strong> normalmente</li>
            <li>Se der erro, aguarde <strong> 30 segundos</strong></li>
            <li>O servidor já estará acordado e pronto ✅</li>
          </ol>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 rounded p-0.5 text-amber-600 transition hover:bg-amber-100"
          aria-label="Fechar aviso"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}