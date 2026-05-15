"use client";

import { useState, useEffect } from "react";

import {
  Plus,
  MoreHorizontalIcon,
  Pencil,
  Trash2,
} from "lucide-react";

import { TransacaoDelete, TransacaoGet } from "@/services/transacoes";

import { TransacoesType } from "@/types/transacoesType";

// componentes
import { Titulos } from "@/components/titulos/titulo";
import { ModalTransacao } from "@/components/dialogo/modal-transacao";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FiltroMes } from "@/components/filtro/filtroMes";

const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Transacoes() {

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] =
    useState<TransacoesType | null>(null);
  const [transacoes, setTransacoes] = useState<TransacoesType[]>([]);

  const hoje = new Date();

  const [mesSelecionado, setMesSelecionado] = useState(
    hoje.getMonth()
  );

  const [anoSelecionado, setAnoSelecionado] = useState(
    hoje.getFullYear()
  );

  async function GetTransacao() {
    try {
      const data = await TransacaoGet();
      setTransacoes(Array.isArray(data) ? data : []);
    } catch {
      console.log("Erro ao buscar transacoes");
    }
  }

  async function handleDelete(id: number) {
    try {
      await TransacaoDelete(id);
      setTransacoes((prev) => prev.filter((t) => t.id !== id));
    } catch {
      console.log("Erro ao deletar");
    }
  }

  useEffect(() => {
    GetTransacao();
  }, []);

  const count = transacoes.length;
  const subtitulo =
    count === 0
      ? "Nenhuma transação cadastrada"
      : count === 1
        ? "1 transação cadastrada"
        : `${count} transações cadastradas`;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <Titulos
        tituloPrincial="Transações"
        subtitulo={subtitulo}
        button="Nova transação"
        icon={<Plus className="size-4" />}
        onClick={() => setOpen(true)}
        filtro={
          <FiltroMes
            mesSelecionado={mesSelecionado}
            anoSelecionado={anoSelecionado}
            onChange={(mes, ano) => {
              setMesSelecionado(mes);
              setAnoSelecionado(ano);
            }}
          />
        }
      />

      <section className="min-w-0">
        <div className="overflow-hidden rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transacoes.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Nenhuma transação ainda. Clique em &quot;Nova transação&quot;
                    para começar.
                  </TableCell>
                </TableRow>
              ) : (
                transacoes.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.title}</TableCell>
                    <TableCell>{t.categoryName || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {t.date
                        ? new Date(t.date).toLocaleDateString("pt-BR")
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          t.type === 1
                            ? "inline-flex rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
                            : "inline-flex rounded-full bg-red-500/15 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-400"
                        }
                      >
                        {t.type === 1 ? "Receita" : "Despesa"}
                      </span>
                    </TableCell>
                    <TableCell
                      className={`text-right font-semibold tabular-nums ${
                        t.type === 1
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {fmtBRL(Number(t.amount) || 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setTransacaoSelecionada(t);
                              setOpenEdit(true);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(t.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <ModalTransacao
        open={open}
        setOpen={setOpen}
        modo="create"
        onSuccess={GetTransacao}
      />
      <ModalTransacao
        open={openEdit}
        setOpen={setOpenEdit}
        modo="edit"
        transacao={transacaoSelecionada}
        onSuccess={GetTransacao}
      />
    </div>
  );
}
