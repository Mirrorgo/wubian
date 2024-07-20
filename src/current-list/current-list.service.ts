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
        song: true, // This includes all the songs in the CurrentList
      },
    });

    // If currentList exists, return the songs array; otherwise, return an empty array
    return currentList?.song || [];
  }
  //  add currentlist for a user
  async addCurrentList(data: { userId: number }) {
    return this.prisma.currentList.create({
      data,
    });
  }

  // add song to currentlist by userid
  async addSongToCurrentList(data: { userId: number; songId: number }) {
    return this.prisma.currentList.upsert({
      where: { userId: data.userId },
      create: {
        userId: data.userId,
        song: {
          connect: { id: data.songId },
        },
      },
      update: {
        song: {
          connect: { id: data.songId },
        },
      },
    });
  }

  async emptyCurrentListByUserId(userId: number) {
    return this.prisma.currentList.delete({
      where: {
        userId: userId,
      },
    });
  }
}
