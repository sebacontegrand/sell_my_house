/*
  Warnings:

  - The values [regular] on the enum `feedEstadoEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [regular] on the enum `feedInmuebleEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [regular] on the enum `feedubicacionEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [regular] on the enum `valoracionEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "feedEstadoEnum_new" AS ENUM ('Muy_bueno', 'Bueno', 'Regular', 'Malo', 'Muy_malo');
ALTER TABLE "FeedBack" ALTER COLUMN "feedEstado" TYPE "feedEstadoEnum_new" USING ("feedEstado"::text::"feedEstadoEnum_new");
ALTER TYPE "feedEstadoEnum" RENAME TO "feedEstadoEnum_old";
ALTER TYPE "feedEstadoEnum_new" RENAME TO "feedEstadoEnum";
DROP TYPE "feedEstadoEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "feedInmuebleEnum_new" AS ENUM ('Muy_bueno', 'Bueno', 'Regular', 'Malo', 'Muy_malo');
ALTER TABLE "FeedBack" ALTER COLUMN "feedInmueble" TYPE "feedInmuebleEnum_new" USING ("feedInmueble"::text::"feedInmuebleEnum_new");
ALTER TYPE "feedInmuebleEnum" RENAME TO "feedInmuebleEnum_old";
ALTER TYPE "feedInmuebleEnum_new" RENAME TO "feedInmuebleEnum";
DROP TYPE "feedInmuebleEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "feedubicacionEnum_new" AS ENUM ('Muy_bueno', 'Bueno', 'Regular', 'Malo', 'Muy_malo');
ALTER TABLE "FeedBack" ALTER COLUMN "feedUbicacion" TYPE "feedubicacionEnum_new" USING ("feedUbicacion"::text::"feedubicacionEnum_new");
ALTER TYPE "feedubicacionEnum" RENAME TO "feedubicacionEnum_old";
ALTER TYPE "feedubicacionEnum_new" RENAME TO "feedubicacionEnum";
DROP TYPE "feedubicacionEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "valoracionEnum_new" AS ENUM ('Muy_bueno', 'Bueno', 'Regular', 'Malo', 'Muy_malo');
ALTER TABLE "FeedBack" ALTER COLUMN "valoracion" TYPE "valoracionEnum_new" USING ("valoracion"::text::"valoracionEnum_new");
ALTER TYPE "valoracionEnum" RENAME TO "valoracionEnum_old";
ALTER TYPE "valoracionEnum_new" RENAME TO "valoracionEnum";
DROP TYPE "valoracionEnum_old";
COMMIT;
