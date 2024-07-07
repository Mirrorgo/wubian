-- DropIndex
DROP INDEX `Song_artistId_fkey` ON `Song`;

-- AlterTable
ALTER TABLE `Song` MODIFY `duration` INTEGER NULL,
    MODIFY `url` VARCHAR(191) NULL;
