-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "externalUrl" TEXT,
    "title" TEXT NOT NULL,
    "operationType" TEXT,
    "propertyType" TEXT,
    "price" DOUBLE PRECISION,
    "currency" TEXT,
    "expenses" DOUBLE PRECISION,
    "address" TEXT,
    "city" TEXT,
    "neighborhood" TEXT,
    "totalArea" DOUBLE PRECISION,
    "coveredArea" DOUBLE PRECISION,
    "rooms" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "garage" INTEGER,
    "description" TEXT NOT NULL,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "agentName" TEXT,
    "agentPhone" TEXT,
    "agentWhatsapp" TEXT,
    "agentEmail" TEXT,
    "officeName" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
