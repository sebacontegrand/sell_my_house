/* eslint-disable @next/next/no-async-client-component */
"use client";
import React from "react";

import styles from "./FeedBackItem.module.css";
import {
  IoCheckboxOutline,
  IoPencil,
  IoPrintOutline,
  IoSquareOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";

interface FeedItemProps {
  id: string;
  prelistingId: string;
  oferta: boolean;
  asesorCaptador: string;
  asesorVendedor: string;
  title: string;
  description: string;
}

const FeedBackItem: React.FC<FeedItemProps> = ({
  id,
  prelistingId,
  oferta,
  asesorCaptador,
  asesorVendedor,
  title,
  description,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard/feedback/");
  };
  const handleClickUpdate = () => {
    localStorage.setItem("id", id!);
    router.push(`/dashboard/feedBackToUpdate?id=${id}`);
  };
  const handleClickPrint = () => {};
  return (
    <div>
      <div
        className={!oferta ? styles.feedBackDone : styles.feedBackPending}
        style={{ position: "relative" }}
      >
        <IoPencil
          onClick={handleClickUpdate}
          className="absolute top-4 right-2 hover:bg-opacity-60 cursor-pointer"
          color="black"
          size={20}
        />
        <IoPrintOutline
          onClick={handleClickUpdate}
          className="absolute top-12 right-2 hover:bg-opacity-60 cursor-pointer"
          color="black"
          size={20}
        />
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
          <div
            className={`flex p-2 rounded-md   ${
              !oferta ? styles.feedBackDone : styles.feedBackPending
            }`}
          >
            {oferta ? (
              <IoCheckboxOutline size={30} />
            ) : (
              <IoSquareOutline size={30} />
            )}
          </div>
          <div
            onClick={handleClick}
            className="text-center sm:text-left text-blue-900"
          >
            {title}
            <hr />
            {description}
            <hr />
            {oferta ? "A ofertar" : "No oferta"}
            <hr />
            Captador: {asesorCaptador}
            <hr />
            Vendedor: {asesorVendedor}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBackItem;
