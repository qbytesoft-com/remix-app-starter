-- CreateTable
CREATE TABLE `AppPlan` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shopId` BIGINT NOT NULL,
    `planName` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `capped_amount` VARCHAR(191) NULL,
    `planId` VARCHAR(191) NOT NULL,
    `shopName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AppPlan_planId_key`(`planId`),
    INDEX `AppPlan_shopName_idx`(`shopName`),
    INDEX `AppPlan_shopId_fkey`(`shopId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Icon` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shopId` BIGINT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `tooltip` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Icon_name_idx`(`name`),
    INDEX `Icon_shopId_fkey`(`shopId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IconDesign` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shopId` BIGINT NOT NULL,
    `shopName` VARCHAR(255) NOT NULL,
    `visibileOn` TINYINT NOT NULL,
    `settings` JSON NOT NULL,
    `customCSS` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `IconDesign_shopId_key`(`shopId`),
    INDEX `IconDesign_shopName_idx`(`shopName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `shop` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `scope` VARCHAR(191) NULL,
    `expires` DATETIME(3) NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `userId` BIGINT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `accountOwner` BOOLEAN NOT NULL DEFAULT false,
    `locale` VARCHAR(191) NULL,
    `collaborator` BOOLEAN NULL DEFAULT false,
    `emailVerified` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shopInfo` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NULL,
    `phone` VARCHAR(20) NULL,
    `contactEmail` VARCHAR(100) NULL,
    `address` TEXT NULL,
    `country` VARCHAR(100) NULL,
    `myshopifyDomain` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `shopOwnerName` VARCHAR(100) NULL,
    `shopDetail` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `shopInfo_name_key`(`name`),
    INDEX `shopInfo_name_idx`(`name`),
    INDEX `shopInfo_email_idx`(`email`),
    INDEX `shopInfo_phone_idx`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AppPlan` ADD CONSTRAINT `AppPlan_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `shopInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Icon` ADD CONSTRAINT `Icon_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `shopInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IconDesign` ADD CONSTRAINT `IconDesign_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `shopInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
