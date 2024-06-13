/*
  Warnings:

  - A unique constraint covering the columns `[prelistingId]` on the table `FeedBack` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prelistingId` to the `FeedBack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeedBack" ADD COLUMN     "prelistingId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FeedBack_prelistingId_key" ON "FeedBack"("prelistingId");

-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_prelistingId_fkey" FOREIGN KEY ("prelistingId") REFERENCES "Prelisting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
