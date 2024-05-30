/*
  Warnings:

  - Made the column `celular` on table `Form` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "celular" SET NOT NULL,
ALTER COLUMN "comentarios" DROP NOT NULL,
ALTER COLUMN "escritura" DROP NOT NULL,
ALTER COLUMN "finalobra" DROP NOT NULL,
ALTER COLUMN "plano" DROP NOT NULL;
