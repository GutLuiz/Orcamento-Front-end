"use client";

import { Cell, Pie, PieChart } from "recharts";

import { chartPalette } from "@/lib/theme-colors";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import Cards from "@/components/card/card";
import { Titulos } from "@/components/titulos/titulo";
import Grafico from "@/components/grafico/grafico";
import Tabelas from "@/components/tabelas/tabelas";
import { TableCell } from "@/components/ui/table";

import { UseDashboard } from "@/hooks/use-dashboard";

const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Home() {
  const { receitas, despesas, saldo, gastosCategoria, listaTransacoes } =
    UseDashboard();

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

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <Titulos
        tituloPrincial="Dashboard"
        subtitulo="Visão geral das suas finanças"
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <Cards
          titulo="Receita"
          tituloDesc="Receita total"
          dados={fmtBRL(Number(receitas) || 0)}
        />
        <Cards
          titulo="Despesa"
          tituloDesc="Despesa total"
          dados={fmtBRL(Number(despesas) || 0)}
        />
        <Cards
          titulo="Saldo"
          tituloDesc="Saldo atual"
          dados={fmtBRL(Number(saldo) || 0)}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0">
          <Grafico titulografico="Gastos por categoria">
            <ChartContainer
              config={GraficoConfig}
              className="mx-auto aspect-square max-h-[280px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChart height={280} margin={{ top: 12, bottom: 12 }}>
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
                      fill={
                        chartPalette[index % chartPalette.length]
                      }
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

        <div className="min-w-0 lg:col-span-1">
          <Tabelas
            titulo="Transações recentes"
            colunas={["Título", "Valor", "Tipo", "Categoria", "Data"]}
            dados={listaTransacoes}
            renderLinha={(item) => (
              <>
                <TableCell className="font-medium">
                  {item.title || "—"}
                </TableCell>
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
    </div>
  );
}
