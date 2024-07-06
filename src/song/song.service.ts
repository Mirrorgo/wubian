import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}

  async getAllSongs() {
    return this.prisma.song.findMany();
  }

  async getSongById(id: number) {
    return this.prisma.song.findUnique({
      where: {
        id: id,
      },
    });
  }
}
