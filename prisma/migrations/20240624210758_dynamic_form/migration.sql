/*
  Warnings:

  - You are about to drop the column `mbanosa` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `mbanosl` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "mbanosa",
DROP COLUMN "mbanosl",
ADD COLUMN     "mbanos1a" DECIMAL(65,30),
ADD COLUMN     "mbanos1l" DECIMAL(65,30),
ADD COLUMN     "mbanos2a" DECIMAL(65,30),
ADD COLUMN     "mbanos2l" DECIMAL(65,30),
ADD COLUMN     "mbanos3a" DECIMAL(65,30),
ADD COLUMN     "mbanos3l" DECIMAL(65,30),
ADD COLUMN     "mbanos4a" DECIMAL(65,30),
ADD COLUMN     "mbanos4l" DECIMAL(65,30),
ADD COLUMN     "mbanos5a" DECIMAL(65,30),
ADD COLUMN     "mbanos5l" DECIMAL(65,30),
ADD COLUMN     "mdorm5a" DECIMAL(65,30),
ADD COLUMN     "mdorm5l" DECIMAL(65,30),
ADD COLUMN     "motrosespaciosa" DECIMAL(65,30),
ADD COLUMN     "motrosespaciosl" DECIMAL(65,30),
ADD COLUMN     "mtoilette1a" DECIMAL(65,30),
ADD COLUMN     "mtoilette1l" DECIMAL(65,30),
ADD COLUMN     "mtoilette2a" DECIMAL(65,30),
ADD COLUMN     "mtoilette2l" DECIMAL(65,30),
ADD COLUMN     "mtoilette3a" DECIMAL(65,30),
ADD COLUMN     "mtoilette3l" DECIMAL(65,30),
ADD COLUMN     "mtoilette4a" DECIMAL(65,30),
ADD COLUMN     "mtoilette4l" DECIMAL(65,30);
