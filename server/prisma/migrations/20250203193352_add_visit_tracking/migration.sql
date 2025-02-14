-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "urlId" INTEGER NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "visitedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
