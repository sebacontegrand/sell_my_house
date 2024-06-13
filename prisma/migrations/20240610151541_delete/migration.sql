-- DropForeignKey
ALTER TABLE "FeedBack" DROP CONSTRAINT "FeedBack_prelistingId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_prelistingId_fkey";

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_prelistingId_fkey" FOREIGN KEY ("prelistingId") REFERENCES "Prelisting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_prelistingId_fkey" FOREIGN KEY ("prelistingId") REFERENCES "Prelisting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
