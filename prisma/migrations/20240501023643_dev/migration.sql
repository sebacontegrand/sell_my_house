/*
  Warnings:

  - The primary key for the `Form` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Prelisting` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_prelistingId_fkey";

-- AlterTable
ALTER TABLE "Form" DROP CONSTRAINT "Form_pkey",
ALTER COLUMN "prelistingId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Form_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Form_id_seq";

-- AlterTable
ALTER TABLE "Prelisting" DROP CONSTRAINT "Prelisting_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Prelisting_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Prelisting_id_seq";

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_prelistingId_fkey" FOREIGN KEY ("prelistingId") REFERENCES "Prelisting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
