-- DropForeignKey
ALTER TABLE "thread" DROP CONSTRAINT "thread_communityId_fkey";

-- AlterTable
ALTER TABLE "thread" ALTER COLUMN "communityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "thread" ADD CONSTRAINT "thread_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE SET NULL ON UPDATE CASCADE;
