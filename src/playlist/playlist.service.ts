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

  async addSongToPlaylist(data: { playlistId: number; songId: number }) {
    // Check if playlist exists
    const playlistExists = await this.prisma.playlist.findUnique({
      where: {
        id: data.playlistId,
      },
    });

    if (!playlistExists) {
      throw new BadRequestException('Playlist does not exist');
    }

    // Check if song exists
    const songExists = await this.prisma.song.findUnique({
      where: {
        id: data.songId,
      },
    });

    if (!songExists) {
      throw new BadRequestException('Song does not exist');
    }

    return this.prisma.playlist.update({
      where: {
        id: data.playlistId,
      },
      data: {
        songs: {
          connect: {
            id: data.songId,
          },
        },
      },
    });
  }
}
