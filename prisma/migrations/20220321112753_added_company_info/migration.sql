-- AlterTable
ALTER TABLE `User` ADD COLUMN `company_address` VARCHAR(191) NULL,
    ADD COLUMN `company_country` VARCHAR(191) NULL,
    ADD COLUMN `company_employees` INTEGER NULL,
    ADD COLUMN `company_name` VARCHAR(191) NULL;
