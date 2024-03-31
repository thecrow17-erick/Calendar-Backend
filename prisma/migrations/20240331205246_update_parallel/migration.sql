/*
  Warnings:

  - You are about to alter the column `name` on the `Parallel` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(1)`.

*/
-- AlterTable
ALTER TABLE "Parallel" ALTER COLUMN "name" SET DATA TYPE VARCHAR(1);
