-- DropForeignKey
ALTER TABLE `Song` DROP FOREIGN KEY `Song_artistId_fkey`;

-- CreateTable
CREATE TABLE `_SongArtist` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SongArtist_AB_unique`(`A`, `B`),
    INDEX `_SongArtist_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SongArtist` ADD CONSTRAINT `_SongArtist_A_fkey` FOREIGN KEY (`A`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SongArtist` ADD CONSTRAINT `_SongArtist_B_fkey` FOREIGN KEY (`B`) REFERENCES `Song`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
