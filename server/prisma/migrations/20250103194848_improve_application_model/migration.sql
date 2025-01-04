/*
  Warnings:

  - The values [Pending] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `coverLetter` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeUrl` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('PHONE_SCREENING', 'ONSITE', 'TECHNICAL', 'BEHAVIORAL', 'FINAL');

-- CreateEnum
CREATE TYPE "InterviewOutcome" AS ENUM ('PASSED', 'FAILED', 'RESCHEDULED', 'NO_SHOW');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'REVIEWING', 'SHORTLISTED', 'INTERVIEWED', 'OFFERED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');
ALTER TABLE "Application" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "coverLetter" TEXT NOT NULL,
ADD COLUMN     "expectedSalary" TEXT,
ADD COLUMN     "noticePeriod" TEXT,
ADD COLUMN     "resumeUrl" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "ApplicationDetail" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "education" JSONB NOT NULL,
    "workExperience" JSONB NOT NULL,
    "skills" TEXT[],
    "additionalInfo" TEXT,

    CONSTRAINT "ApplicationDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "interviewType" "InterviewType" NOT NULL,
    "interviewerName" TEXT NOT NULL,
    "notes" TEXT,
    "outcome" "InterviewOutcome",

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationDetail_applicationId_key" ON "ApplicationDetail"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_applicationId_key" ON "Interview"("applicationId");

-- AddForeignKey
ALTER TABLE "ApplicationDetail" ADD CONSTRAINT "ApplicationDetail_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
