import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

interface DialogoProps {
  titulo: string
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: (e: React.FormEvent) => void
  children: React.ReactNode
}

export function Dialogo({
  titulo,
  open,
  setOpen,
  onSubmit,
  children,
}: DialogoProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">
            {titulo}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">

          {children}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button type="submit" className="bg-green-800">
              Salvar
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}