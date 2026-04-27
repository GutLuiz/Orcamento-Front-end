import { Button } from "../ui/button";

interface TituloProps{
    tituloPrincial : string;
    subtitulo : string;
    button : string;
    icon : React.ReactNode;
    onClick?: () => void
}

export function Titulos({ tituloPrincial, subtitulo, button, icon, onClick}: TituloProps) {
    return (
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        
        <div>
          <h2 className="text-sm text-muted-foreground">
            {subtitulo}
          </h2>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            {tituloPrincial}
          </h1>
        </div>
  
        <Button  onClick={onClick}  size="lg" className="bg-green-800 flex items-center gap-2 px-10 py-5 rounded-xl">
          {icon}
          {button}
        </Button>
      </section>
    )
  }