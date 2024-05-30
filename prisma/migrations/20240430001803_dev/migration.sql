-- CreateTable
CREATE TABLE "Prelisting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prelisting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asesor" TEXT NOT NULL,
    "proprietario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" INTEGER NOT NULL,
    "fechadenacimiento" TIMESTAMP(3) NOT NULL,
    "porquevende" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_email_key" ON "Form"("email");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_id_fkey" FOREIGN KEY ("id") REFERENCES "Prelisting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
