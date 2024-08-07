/*
  Warnings:

  - The primary key for the `divisions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `divisions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `division_id` column on the `tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `division_id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_division_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_division_id_fkey";

-- AlterTable
ALTER TABLE "divisions" DROP CONSTRAINT "divisions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "divisions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_pkey",
DROP COLUMN "division_id",
ADD COLUMN     "division_id" INTEGER,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tickets_id_seq";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "division_id",
ADD COLUMN     "division_id" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
