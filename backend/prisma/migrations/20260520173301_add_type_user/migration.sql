/*
  Warnings:

  - Added the required column `typeUser` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('MEMBER', 'FOREIGNER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "typeUser" "TypeUser" NOT NULL;
