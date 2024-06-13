-- CreateEnum
CREATE TYPE "valoracionEnum" AS ENUM ('Muy_bueno', 'Bueno', 'regular', 'Malo', 'Muy_Malo');

-- CreateTable
CREATE TABLE "FeedBack" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valoracion" "valoracionEnum" NOT NULL,
    "masgusto" TEXT NOT NULL,
    "menosgusto" TEXT NOT NULL,
    "oferta" BOOLEAN NOT NULL,

    CONSTRAINT "FeedBack_pkey" PRIMARY KEY ("id")
);
