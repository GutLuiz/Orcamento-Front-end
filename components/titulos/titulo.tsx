interface TituloProps{
    tituloPrincial : string;
    subtitulo : string;
}

export function Titulos({ tituloPrincial, subtitulo }: TituloProps) {
    return(
        <div>
            <h1 className="text-lg">
                {tituloPrincial}
            </h1>
            <h2 className="text-2xl">
                {subtitulo}
            </h2>
        </div>
    )
}