-- CreateTable
CREATE TABLE "TemporaryLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemporaryLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemporaryLink_id_key" ON "TemporaryLink"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TemporaryLink_shortUrl_key" ON "TemporaryLink"("shortUrl");
