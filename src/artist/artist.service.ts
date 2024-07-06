import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists() {
    return this.prisma.artist.findMany();
  }

  async getArtistById(id: number) {
    return this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });
  }

  //   只创建artist, 不添加其他任何东西
  async createArtistOnly(data: { name: string }) {
    return this.prisma.artist.create({
      data,
    });
  }
}
