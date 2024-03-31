/*
  Warnings:

  - A unique constraint covering the columns `[year]` on the table `Management` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Matter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Masculino', 'Femenino');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Management" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Matter" ADD COLUMN     "name" VARCHAR(60) NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Parallel" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "sex" "Sex" NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Management_year_key" ON "Management"("year");
