/*
  Warnings:

  - You are about to drop the column `porquevende` on the `Form` table. All the data in the column will be lost.
  - Added the required column `comentarios` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `escritura` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalobra` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plano` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "catEnum" AS ENUM ('Altonivel', 'excelente', 'muybueno', 'regular');

-- CreateEnum
CREATE TYPE "heatEnum" AS ENUM ('losaradiante', 'radiadores', 'splitfc', 'central', 'sin');

-- CreateEnum
CREATE TYPE "estadoEnum" AS ENUM ('bueno', 'construccion', 'estrenar', 'excelente', 'muybueno', 'reciclado', 'refaccionar', 'regular', 'pozo', 'otro');

-- CreateEnum
CREATE TYPE "orientEnum" AS ENUM ('N', 'NO', 'O', 'SO', 'S', 'SE', 'E', 'NE');

-- CreateEnum
CREATE TYPE "solveEnum" AS ENUM ('hipoteca', 'inhibiciones', 'matrimonio', 'otros');

-- CreateEnum
CREATE TYPE "includeEnum" AS ENUM ('muebles', 'cortinas', 'aires', 'luces', 'otros');

-- CreateEnum
CREATE TYPE "whyEnum" AS ENUM ('divorcio', 'economico', 'mudanza', 'otros');

-- CreateEnum
CREATE TYPE "typeEnum" AS ENUM ('alquiler', 'venta', 'alquilertemporario', 'ventayalquiler', 'ventayalqtemp', 'otros');

-- CreateEnum
CREATE TYPE "propEnum" AS ENUM ('dpto', 'casa', 'galpon', 'local', 'negocio', 'ph', 'cochera', 'oficina', 'lote', 'edificio', 'quinta', 'campo', 'otro');

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "porquevende",
ADD COLUMN     "ambientes" INTEGER,
ADD COLUMN     "amenities" BOOLEAN,
ADD COLUMN     "antiguedad" INTEGER,
ADD COLUMN     "banos" INTEGER,
ADD COLUMN     "baulera" BOOLEAN,
ADD COLUMN     "cantascensores" INTEGER,
ADD COLUMN     "categoria" "catEnum",
ADD COLUMN     "cocheras" INTEGER,
ADD COLUMN     "comentarios" TEXT NOT NULL,
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "dormitorio" INTEGER,
ADD COLUMN     "dormitorioserv" BOOLEAN,
ADD COLUMN     "escritura" BOOLEAN NOT NULL,
ADD COLUMN     "estado" "estadoEnum",
ADD COLUMN     "expensas" INTEGER,
ADD COLUMN     "finalobra" BOOLEAN NOT NULL,
ADD COLUMN     "heattype" "heatEnum",
ADD COLUMN     "impuestos" INTEGER,
ADD COLUMN     "includedinsell" "includeEnum",
ADD COLUMN     "mbanosa" INTEGER,
ADD COLUMN     "mbanosl" INTEGER,
ADD COLUMN     "mcocha" INTEGER,
ADD COLUMN     "mcochl" INTEGER,
ADD COLUMN     "mcocinaa" INTEGER,
ADD COLUMN     "mcocinal" INTEGER,
ADD COLUMN     "mcomedora" INTEGER,
ADD COLUMN     "mcomedorl" INTEGER,
ADD COLUMN     "mdorm1a" INTEGER,
ADD COLUMN     "mdorm1l" INTEGER,
ADD COLUMN     "mdorm2a" INTEGER,
ADD COLUMN     "mdorm2l" INTEGER,
ADD COLUMN     "mdorm3l" INTEGER,
ADD COLUMN     "mdorm4a" INTEGER,
ADD COLUMN     "mdorm4l" INTEGER,
ADD COLUMN     "mhalla" INTEGER,
ADD COLUMN     "mhalll" INTEGER,
ADD COLUMN     "mlava" INTEGER,
ADD COLUMN     "mlavl" INTEGER,
ADD COLUMN     "mlivinga" INTEGER,
ADD COLUMN     "mlivingl" INTEGER,
ADD COLUMN     "mpiletaa" INTEGER,
ADD COLUMN     "mpiletal" INTEGER,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "neighbors" TEXT,
ADD COLUMN     "ocupacion" BOOLEAN,
ADD COLUMN     "orientacion" "orientEnum",
ADD COLUMN     "plano" BOOLEAN NOT NULL,
ADD COLUMN     "plantas" INTEGER,
ADD COLUMN     "propertytype" "propEnum",
ADD COLUMN     "selltobuy" BOOLEAN,
ADD COLUMN     "servicios" TEXT,
ADD COLUMN     "solvebeforesell" "solveEnum",
ADD COLUMN     "toilette" INTEGER,
ADD COLUMN     "typeoperation" "typeEnum",
ADD COLUMN     "valoralquiler" INTEGER,
ADD COLUMN     "valorventa" INTEGER,
ADD COLUMN     "whenneedtomove" TIMESTAMP(3),
ADD COLUMN     "whyneedtomove" "whyEnum",
ADD COLUMN     "whysell" TEXT,
ALTER COLUMN "celular" DROP NOT NULL,
ALTER COLUMN "fechadenacimiento" DROP NOT NULL;
