/*
  Warnings:

  - You are about to drop the column `typeUser` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "typeUser";

-- DropEnum
DROP TYPE "TypeUser";
