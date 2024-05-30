"use client";

import FormItem from "./FormItem";
import React from "react";

enum typeEnum {
  alquiler = "alquiler",
  venta = "venta",
  alquilertemporario = "alquilertemporario",
  ventayalquiler = "ventayalquiler",
  ventayalqtemp = "ventayalqtemp",
  otros = "otros",
}

interface Form {
  id: string;
  proprietario: string;
  typeoperation: typeEnum | null;
  asesor: string;
}

interface Props {
  forms: Form[];
}
export const FormGrid = ({ forms }: Props) => {
  console.log("%c Line:11 🌶 form", "color:#2eafb0", forms);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 cursor-pointer">
      {forms?.map((f) => (
        <FormItem
          key={f.id}
          id={f.id}
          proprietario={f.proprietario}
          typeoperation={f.typeoperation as typeEnum}
          asesor={f.asesor}
        />
      ))}
    </div>
  );
};
