"use client";
import Image from "next/image";
import c21 from "../../public/images/c21.png";
import house from "../../public/images/house.jpg";
import Link from "next/link";
const DashBoardPage = () => {
  return (
    <div className="grid gap-6 md:grid-row-2 lg:grid-row-3 items-center">
      Gestion de Clientes Century 21
      <div className="flex flex-row gap-4 md:gap-6 lg:gap-8 text-center">
        <Link
          className="text-sm sm:text-base md:text-lg bg-yellow-700 rounded-md p-2 text-gray-800 font-semibold hover:bg-yellow-500 hover:box-shadow"
          href={"/dashboard/propriedad"}
        >
          Propriedades en Gestión
        </Link>
        <Link
          className="text-sm sm:text-base md:text-lg bg-yellow-700 rounded-md p-2 text-gray-800 font-semibold hover:bg-yellow-500 hover:box-shadow"
          href={"/dashboard/form"}
        >
          Prelistings
        </Link>
        <Link
          className="text-sm sm:text-base md:text-lg bg-yellow-700 rounded-md p-2 text-gray-800 font-semibold hover:bg-yellow-500 hover:box-shadow"
          href={"/dashboard/feedback"}
        >
          FeedBack a Clientes
        </Link>
      </div>
      <Image src={house} alt={""} />
    </div>
  );
};

export default DashBoardPage;
