/* eslint-disable @next/next/no-async-client-component */
"use client";
import React from "react";
import styles from "./FeedBackItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
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

  return (
    <div>
      <div className={!oferta ? styles.feedBackDone : styles.feedBackPending}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
          <div
            className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
              id === "" ? "bg-blue-100" : "bg-red-100"
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
