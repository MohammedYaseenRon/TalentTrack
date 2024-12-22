/*
  Warnings:

  - Added the required column `data` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "data" BYTEA NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "updatedAt" DROP DEFAULT;
