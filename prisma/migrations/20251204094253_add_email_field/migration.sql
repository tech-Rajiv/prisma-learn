/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Employe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employe" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employe_email_key" ON "Employe"("email");
