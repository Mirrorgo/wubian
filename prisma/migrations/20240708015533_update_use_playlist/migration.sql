/*
  Warnings:

  - You are about to drop the `_UserPlaylist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_UserPlaylist` DROP FOREIGN KEY `_UserPlaylist_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserPlaylist` DROP FOREIGN KEY `_UserPlaylist_B_fkey`;

-- AlterTable
ALTER TABLE `Playlist` ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_UserPlaylist`;

-- AddForeignKey
ALTER TABLE `Playlist` ADD CONSTRAINT `Playlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
