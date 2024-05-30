/* eslint-disable @next/next/no-async-client-component */
"use client";
import React from "react";
import styles from "./FormItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

enum typeEnum {
  alquiler = "alquiler",
  venta = "venta",
  alquilertemporario = "alquilertemporario",
  ventayalquiler = "ventayalquiler",
  ventayalqtemp = "ventayalqtemp",
  otros = "otros",
}
interface FormItemProps {
  id: string;
  proprietario: string;
  typeoperation: typeEnum | null;
  asesor: string;
}

const FormItem: React.FC<FormItemProps> = ({
  id,
  proprietario,
  typeoperation,
  asesor,
}) => {
  return (
    <div>
      <div className={!asesor ? styles.formDone : styles.formPending}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
          <div
            className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
              id === "" ? "bg-blue-100" : "bg-red-100"
            }`}
          >
            {asesor ? (
              <IoCheckboxOutline size={30} />
            ) : (
              <IoSquareOutline size={30} />
            )}
          </div>
          <div className="text-center sm:text-left text-blue-900">
            Proprietario: {proprietario}
            <hr />
            Asesor: {asesor}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormItem;
