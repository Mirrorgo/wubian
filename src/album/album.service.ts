import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAllAlbums() {
    return this.prisma.album.findMany();
  }

  async getAlbumById(id: number) {
    return this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createAlbum(data: { title: string; artistId: number }) {
    return this.prisma.album.create({
      data,
    });
  }

  async updateAlbum(data: { albumId: number; title?: string }) {
    return this.prisma.album.update({
      where: {
        id: data.albumId,
      },
      data: {
        title: data.title,
      },
    });
  }
}
