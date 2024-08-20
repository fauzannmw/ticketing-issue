/*
  Warnings:

  - The values [PENDING,IN_PROGRESS,COMPLETE] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `description` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('backlog', 'in_progress', 'complete');
ALTER TABLE "tickets" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "priority" "Priority" NOT NULL;
