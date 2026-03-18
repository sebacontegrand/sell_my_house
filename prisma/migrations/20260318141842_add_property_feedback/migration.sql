-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "propertyId" TEXT,
ALTER COLUMN "prelistingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
