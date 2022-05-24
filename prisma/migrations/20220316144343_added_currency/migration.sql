/*
  Warnings:

  - Added the required column `currency_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `currency_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `currency_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `multiplier` FLOAT NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_currency_id_fkey` FOREIGN KEY (`currency_id`) REFERENCES `Currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_currency_id_fkey` FOREIGN KEY (`currency_id`) REFERENCES `Currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
