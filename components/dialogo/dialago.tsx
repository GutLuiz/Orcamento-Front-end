import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

interface DialogoProps {
    titulo: string
    open: boolean
    setOpen: (open: boolean) => void
    value: string
    onChange: (value: string) => void
    onSubmit: (e: React.FormEvent) => void
  }

  export function Dialogo({
    titulo,
    open,
    setOpen,
    value,
    onChange,
    onSubmit,
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
            <div>
              <h2 className="text-sm mb-1">Nome</h2>
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Nome da categoria"
              />
            </div>
  
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