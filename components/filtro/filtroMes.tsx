"use client";

import { ChevronDown, CalendarDays } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface FiltroMesProps {
  mesSelecionado: number;
  anoSelecionado: number;
  onChange: (mes: number, ano: number) => void;
}

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function FiltroMes({
  mesSelecionado,
  anoSelecionado,
  onChange,
}: FiltroMesProps) {
  const anoAtual = new Date().getFullYear();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-xl"
        >
          <CalendarDays className="h-4 w-4" />

          {meses[mesSelecionado]} {anoSelecionado}

          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {meses.map((mes, index) => (
          <DropdownMenuItem
            key={mes}
            onClick={() => onChange(index, anoAtual)}
          >
            {mes}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}