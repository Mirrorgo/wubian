/*
  Warnings:

  - You are about to drop the `_CurrentListSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CurrentListSong` DROP FOREIGN KEY `_CurrentListSong_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CurrentListSong` DROP FOREIGN KEY `_CurrentListSong_B_fkey`;

-- AlterTable
ALTER TABLE `CurrentList` ADD COLUMN `currentPlayingSongId` INTEGER NULL;

-- DropTable
DROP TABLE `_CurrentListSong`;

-- CreateTable
CREATE TABLE `CurrentListSong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `currentListId` INTEGER NOT NULL,
    `songId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,

    UNIQUE INDEX `CurrentListSong_currentListId_order_key`(`currentListId`, `order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CurrentListSong` ADD CONSTRAINT `CurrentListSong_currentListId_fkey` FOREIGN KEY (`currentListId`) REFERENCES `CurrentList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CurrentListSong` ADD CONSTRAINT `CurrentListSong_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `Song`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
