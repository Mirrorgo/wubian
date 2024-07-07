import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createSong(data: { title: string; artistId: number }) {
    return this.prisma.song.create({
      data,
    });
  }

  async updateSong(data: {
    songId: number;
    title?: string;
    artistId?: number;
    url?: string;
  }) {
    if (data.artistId) {
      // Check if artistId exists
      const artistExists = await this.prisma.artist.findUnique({
        where: {
          id: data.artistId,
        },
      });

      if (!artistExists) {
        throw new BadRequestException('Artist does not exist');
      }
    }
    return this.prisma.song.update({
      where: {
        id: data.songId,
      },
      data: {
        title: data.title,
        artistId: data.artistId,
        url: data.url,
      },
    });
  }
}
