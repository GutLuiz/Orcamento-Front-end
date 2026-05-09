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
    <Card className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{titulografico}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
export default Grafico;
