import React, { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GraficoContainerProps {
  titulografico: string;
  children: ReactNode;
  onclick?: () => void;
}

const Grafico: React.FC<GraficoContainerProps> = ({
  titulografico,
  children
}) => (
    <Card className="h-full border-border/80 shadow-sm transition-shadow duration-200 hover:shadow-md">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base font-semibold">{titulografico}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="pt-0">{children}</CardContent>
  </Card>
);
export default Grafico;
