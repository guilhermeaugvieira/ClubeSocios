/*
  Warnings:

  - You are about to alter the column `placa` on the `veiculos_socios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `VarChar(7)`.

*/
-- AlterTable
ALTER TABLE "veiculos_socios" ALTER COLUMN "placa" SET DATA TYPE VARCHAR(7);
