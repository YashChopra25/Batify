/*
  Warnings:

  - You are about to drop the column `ShortUTL` on the `Url` table. All the data in the column will be lost.
  - Added the required column `ShortURL` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "ShortUTL",
ADD COLUMN     "ShortURL" TEXT NOT NULL;
