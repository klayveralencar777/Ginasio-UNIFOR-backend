/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[registration]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "registration" TEXT;

-- DropTable
DROP TABLE "Member";

-- DropEnum
DROP TYPE "MemberType";

-- CreateIndex
CREATE UNIQUE INDEX "User_registration_key" ON "User"("registration");
