"use client";

//GRAFICOS
import {
  Cell,
  Pie,
  PieChart
} from "recharts";

import { chartPalette } from "@/lib/theme-colors";

// COMPONENTES:
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"; 
import Cards from "@/components/card/card"
import { Titulos } from "@/components/titulos/titulo"
import Grafico from "@/components/grafico/grafico";
import Tabelas from "@/components/tabelas/tabelas";
import { TableCell } from "@/components/ui/table";

// hooks
import { UseDashboard } from "@/hooks/use-dashboard"

export default function Home(){
   // cores
   const cores = [
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];
    const {
      receitas,
      despesas,
      saldo,
      gastosCategoria,
      listaTransacoes
    } = UseDashboard();

  // configs dos graficos
  const dados = gastosCategoria;
  const GraficoConfig = Object.fromEntries(
    dados.map((item, i) => [
      item.categoria,
      {
        label: item.categoria,
        color: chartPalette[i % chartPalette.length],
      },
    ])
  ) satisfies ChartConfig;
    return(
       <main>
         <section>
            <Titulos 
            tituloPrincial="Dashboard"
            subtitulo="Visao Geral"
            button={false}
            icon={false}
            />
        </section>
       
        <section className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-12">
            <Cards
              titulo="Receita"
              tituloDesc="Receita total"
              dados={receitas}
            />
            <Cards
              titulo="Despesa"
              tituloDesc="Despesa total"
              dados={despesas}
            />
            <Cards
              titulo="Saldo"
              tituloDesc="Saldo Atual"
              dados={saldo}
            />
          </section>
          <section className="grid gap-5 lg:grid-cols-2">
            <div className="w-full">
              <Grafico
                titulografico="Percentual de faturamento Por Filiais"
              >
                <ChartContainer
                  config={GraficoConfig}
                  className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
                >
                    <PieChart height={250} margin={{ top: 15, bottom: 15 }}>
                      <ChartTooltip
                        cursor={false}
                        content={
                          <ChartTooltipContent nameKey="categoria" hideLabel />
                        }
                      />
                      <Pie
                        data={gastosCategoria}
                        dataKey="valor"
                        nameKey="categoria"
                        label
                      >
                         {gastosCategoria.map((entry, index) => (
                          <Cell
                            key={entry.categoria}
                            fill={cores[index % cores.length]}
                          />
                        ))}
                      </Pie>
                      <ChartLegend
                        content={<ChartLegendContent nameKey="categoria" />}
                      />
                    </PieChart>
                </ChartContainer>
              </Grafico>
            </div>
            <div className="w-full">
            <Tabelas
                titulo="Transações recentes"
                colunas={["Título", "Valor", "Tipo", "Categoria", "Data"]}
                dados={listaTransacoes}
                renderLinha={(item) => (
                  <>
                    <TableCell className="font-medium">{item.title || "—"}</TableCell>
                    <TableCell>
                      {(item.amount ?? 0).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell>{item.type ?? "—"}</TableCell>
                    <TableCell>{item.categoryName || "—"}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.date
                        ? new Date(item.date).toLocaleDateString("pt-BR")
                        : "—"}
                    </TableCell>
                  </>
                )}
              />
            </div>
          </section>
  
       </main>
        
    )
}
