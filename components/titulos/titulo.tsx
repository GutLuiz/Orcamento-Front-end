import { Button } from "../ui/button"

interface TituloProps {
  tituloPrincial: string
  subtitulo: string
  button?: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
}

export function Titulos({
  tituloPrincial,
  subtitulo,
  button,
  icon,
  onClick,
}: TituloProps) {
  const showAction = Boolean(button) || Boolean(icon)

  return (
    <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{subtitulo}</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {tituloPrincial}
        </h1>
      </div>

      {showAction ? (
        <Button
          onClick={onClick}
          size="lg"
          className="mt-3 shrink-0 gap-2 rounded-xl bg-primary px-8 text-primary-foreground sm:mt-0"
        >
          {icon}
          {button}
        </Button>
      ) : null}
    </div>
  )
}