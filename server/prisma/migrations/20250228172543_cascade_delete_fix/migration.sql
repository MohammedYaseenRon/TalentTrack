-- DropForeignKey
ALTER TABLE "ApplicationDetail" DROP CONSTRAINT "ApplicationDetail_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "ApplicationDetail" ADD CONSTRAINT "ApplicationDetail_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
