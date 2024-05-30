/*
  Warnings:

  - The `fechadenacimiento` column on the `Form` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "date" DROP DEFAULT,
DROP COLUMN "fechadenacimiento",
ADD COLUMN     "fechadenacimiento" TIMESTAMP(3);
