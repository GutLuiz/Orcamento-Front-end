import type { ReactNode } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TabelaSimplesProps<T> {
  colunas: string[]
  dados: T[]
  /** Retorne um fragmento com `<TableCell>` para cada coluna, na mesma ordem de `colunas`. */
  renderLinha: (item: T, indice: number) => ReactNode
  /** Opcional: título acima da tabela */
  titulo?: string
}

export default function TabelaSimples<T>({
  colunas,
  dados,
  renderLinha,
  titulo,
}: TabelaSimplesProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card text-card-foreground shadow-sm">
      {titulo ? (
        <div className="border-b px-4 py-3">
          <h3 className="text-lg font-semibold">{titulo}</h3>
        </div>
      ) : null}
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            {colunas.map((col, idx) => (
              <TableHead
                key={idx}
                className={
                  idx === colunas.length - 1 ? "text-right" : undefined
                }
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dados.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={colunas.length}
                className="h-24 text-center text-muted-foreground"
              >
                Nenhum registro.
              </TableCell>
            </TableRow>
          ) : (
            dados.map((item, indice) => (
              <TableRow key={indice}>{renderLinha(item, indice)}</TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
