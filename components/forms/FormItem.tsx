/* eslint-disable @next/next/no-async-client-component */
"use client";
import React from "react";
import styles from "./FormItem.module.css";
import {
  IoSearch,
  IoCheckboxOutline,
  IoPencil,
  IoSquareOutline,
  IoPrint,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Form } from "@prisma/client";

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
  prelistingId?: string;
  date?: Date;
  email?: string;
  celular?: number;
  proprietario: string;
  typeoperation?: typeEnum | null;
  asesor: string;
}

const FormItem: React.FC<FormItemProps> = ({
  id,
  prelistingId,
  date,
  email,
  celular,
  proprietario,
  typeoperation,
  asesor,
}) => {
  const router = useRouter();
  const handleClick = () => {
    localStorage.setItem("id", id!);
    localStorage.setItem("asesor", asesor);
    router.push(`/dashboard/formToUpdate/?id=${id}`);
  };

  return (
    <div>
      <div
        className={!asesor ? styles.formDone : styles.formPending}
        style={{ position: "relative" }}
      >
        <IoPencil
          onClick={handleClick}
          className="absolute top-4 right-2 hover:bg-opacity-60"
          color="gray"
          size={20}
        />
        <IoPrint
          onClick={handleClick}
          className="absolute top-12 right-2 hover:bg-opacity-60"
          color="gray"
          size={20}
        />
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
          <div
            className={`flex p-2 rounded-md  hover:bg-opacity-60 ${
              prelistingId === "" ? "bg-blue-100" : "bg-red-100"
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
            <hr />
            Operacion: {typeoperation}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormItem;
