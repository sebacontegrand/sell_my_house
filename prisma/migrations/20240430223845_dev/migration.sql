/*
  Warnings:

  - The primary key for the `Form` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Form` table. All the data in the column will be lost.
  - The primary key for the `Prelisting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Prelisting` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[prelistingId]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prelistingId` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_id_fkey";

-- AlterTable
ALTER TABLE "Form" DROP CONSTRAINT "Form_pkey",
DROP COLUMN "id",
ADD COLUMN     "prelistingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Prelisting" DROP CONSTRAINT "Prelisting_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Prelisting_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Form_prelistingId_key" ON "Form"("prelistingId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_prelistingId_fkey" FOREIGN KEY ("prelistingId") REFERENCES "Prelisting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
