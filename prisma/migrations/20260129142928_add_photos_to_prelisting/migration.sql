-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_prelistingId_fkey";

-- DropIndex
DROP INDEX "Form_email_key";

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "roomDimensions" JSONB,
ADD COLUMN     "totalArea" DOUBLE PRECISION,
ALTER COLUMN "asesor" DROP NOT NULL,
ALTER COLUMN "proprietario" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "celular" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Prelisting" ADD COLUMN     "photos" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "prelistingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitorName" TEXT,
    "visitorContact" TEXT,
    "impression" TEXT NOT NULL,
    "rating" INTEGER,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_prelistingId_fkey" FOREIGN KEY ("prelistingId") REFERENCES "Prelisting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_prelistingId_fkey" FOREIGN KEY ("prelistingId") REFERENCES "Prelisting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
