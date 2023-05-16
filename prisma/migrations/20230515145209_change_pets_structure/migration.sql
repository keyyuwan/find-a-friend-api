/*
  Warnings:

  - You are about to drop the column `environment` on the `pets` table. All the data in the column will be lost.
  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energy_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independence_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "environment",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" TEXT NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL,
DROP COLUMN "energy_level",
ADD COLUMN     "energy_level" TEXT NOT NULL,
DROP COLUMN "independence_level",
ADD COLUMN     "independence_level" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Age";

-- DropEnum
DROP TYPE "EnergyLevel";

-- DropEnum
DROP TYPE "Environment";

-- DropEnum
DROP TYPE "IndependenceLevel";

-- DropEnum
DROP TYPE "Size";
