
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


interface cardsProps {
    titulo: string
    tituloDesc?: string;
    icone?: React.ReactNode;
    dados?: React.ReactNode;
    onclick?: () => void;
}

const Cards: React.FC<cardsProps> = ({ titulo, tituloDesc, icone, dados, onclick }) => (
  <section className="flex w-full flex-col">
    <Card
      onClick={onclick}
      className={`h-full border-border/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${onclick ? "cursor-pointer" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium text-muted-foreground sm:text-base">
            {titulo}
          </CardTitle>
          {icone != null ? (
            <span className="text-muted-foreground [&_svg]:size-4">{icone}</span>
          ) : null}
        </div>
        {tituloDesc ? (
          <CardDescription className="text-xs text-muted-foreground/90">
            {tituloDesc}
          </CardDescription>
        ) : null}
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground sm:text-3xl">
          {dados}
        </p>
      </CardContent>
    </Card>
  </section>
)
export default Cards;