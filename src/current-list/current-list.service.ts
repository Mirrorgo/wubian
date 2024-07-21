import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CurrentlistService {
  constructor(private prisma: PrismaService) {}

  async getCurrentListByUserId(userId: number) {
    const currentList = await this.prisma.currentList.findUnique({
      where: {
        userId: userId,
      },
      include: {
        songs: {
          include: {
            song: true, // This includes the Song details for each CurrentListSong
          },
          orderBy: {
            order: 'asc', // Order the songs by their order in the list
          },
        },
      },
    });

    if (!currentList) {
      return null; // Or you could return a default structure if preferred
    }

    // Transform the data to match the desired output structure
    return {
      id: currentList.id,
      userId: currentList.userId,
      currentPlayingSongId: currentList.currentPlayingSongId,
      songs: currentList.songs.map((listSong) => ({
        id: listSong.song.id,
        title: listSong.song.title,
        url: listSong.song.url,
        artistId: listSong.song.artistId,
        albumId: listSong.song.albumId,
        createdAt: listSong.song.createdAt,
        updatedAt: listSong.song.updatedAt,
        order: listSong.order,
      })),
      createdAt: currentList.createdAt,
      updatedAt: currentList.updatedAt,
    };
  }

  async addSongToCurrentList(data: { userId: number; songId: number }) {
    return this.prisma.$transaction(async (prisma) => {
      // Find or create the CurrentList for the user
      let currentList = await prisma.currentList.findUnique({
        where: { userId: data.userId },
        include: { songs: true },
      });

      if (!currentList) {
        currentList = await prisma.currentList.create({
          data: { userId: data.userId },
          include: { songs: true },
        });
      }

      // Get the next order number
      const nextOrder = currentList.songs.length + 1;

      // Add the song to the CurrentList
      const addedSong = await prisma.currentListSong.create({
        data: {
          currentListId: currentList.id,
          songId: data.songId,
          order: nextOrder,
        },
        include: {
          song: true,
        },
      });

      // If this is the first song added, set it as the current playing song
      if (nextOrder === 1) {
        await prisma.currentList.update({
          where: { id: currentList.id },
          data: { currentPlayingSongId: addedSong.id },
        });
      }

      return addedSong;
    });
  }

  // async emptyCurrentListByUserId(userId: number) {
  //   return this.prisma.currentList.delete({
  //     where: {
  //       userId: userId,
  //     },
  //   });
  // }
}
