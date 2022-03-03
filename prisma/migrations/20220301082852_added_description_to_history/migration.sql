/*
  Warnings:

  - Added the required column `description` to the `OrderStatusHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderStatusHistory` ADD COLUMN `description` LONGTEXT NOT NULL;
