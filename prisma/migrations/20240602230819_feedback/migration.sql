/*
  Warnings:

  - The values [Muy_Malo] on the enum `valoracionEnum` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `feedEstado` to the `FeedBack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedInmueble` to the `FeedBack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedUbicacion` to the `FeedBack` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "feedEstadoEnum" AS ENUM ('Muy_bueno', 'Bueno', 'regular', 'Malo', 'Muy_malo');

-- CreateEnum
CREATE TYPE "feedInmuebleEnum" AS ENUM ('Muy_bueno', 'Bueno', 'regular', 'Malo', 'Muy_malo');

-- CreateEnum
CREATE TYPE "feedubicacionEnum" AS ENUM ('Muy_bueno', 'Bueno', 'regular', 'Malo', 'Muy_malo');

-- AlterEnum
BEGIN;
CREATE TYPE "valoracionEnum_new" AS ENUM ('Muy_bueno', 'Bueno', 'regular', 'Malo', 'Muy_malo');
ALTER TABLE "FeedBack" ALTER COLUMN "valoracion" TYPE "valoracionEnum_new" USING ("valoracion"::text::"valoracionEnum_new");
ALTER TYPE "valoracionEnum" RENAME TO "valoracionEnum_old";
ALTER TYPE "valoracionEnum_new" RENAME TO "valoracionEnum";
DROP TYPE "valoracionEnum_old";
COMMIT;

-- AlterTable
ALTER TABLE "FeedBack" ADD COLUMN     "feedEstado" "feedEstadoEnum" NOT NULL,
ADD COLUMN     "feedInmueble" "feedInmuebleEnum" NOT NULL,
ADD COLUMN     "feedUbicacion" "feedubicacionEnum" NOT NULL;
