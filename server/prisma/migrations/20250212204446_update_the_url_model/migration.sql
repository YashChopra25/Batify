/*
  Warnings:

  - A unique constraint covering the columns `[ShortURL]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_ShortURL_key" ON "Url"("ShortURL");
