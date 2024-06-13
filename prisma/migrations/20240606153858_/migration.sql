/*
  Warnings:

  - Added the required column `asesorCaptador` to the `FeedBack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `asesorVendedor` to the `FeedBack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeedBack" ADD COLUMN     "asesorCaptador" TEXT NOT NULL,
ADD COLUMN     "asesorVendedor" TEXT NOT NULL;
