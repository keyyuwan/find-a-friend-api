/*
  Warnings:

  - You are about to drop the column `adoption_requirements` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `images_url` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adoption_requirements",
DROP COLUMN "images_url";

-- CreateTable
CREATE TABLE "pets_gallery" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pets_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption_requirements" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "adoption_requirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets_gallery" ADD CONSTRAINT "pets_gallery_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
