import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}
  async getAllPlaylists() {
    return this.prisma.playlist.findMany();
  }

  async createPlaylist(data: { title: string; userId: number }) {
    return this.prisma.playlist.create({
      data,
    });
  }

  async updatePlaylistName(data: { playlistId: number; title?: string }) {
    return this.prisma.playlist.update({
      where: {
        id: data.playlistId,
      },
      data: {
        title: data.title,
      },
    });
  }
}
