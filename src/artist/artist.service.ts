import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists(data: { option?: 'name' }) {
    if (data.option === 'name') {
      // Fetch all artists and group by name
      const groupedArtists = await this.prisma.artist.groupBy({
        by: ['name'],
        _count: {
          name: true,
        },
        having: {
          name: {
            _count: {
              gt: 1,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
        take: 20,
      });

      // Extract the names of the artists with duplicates
      const duplicateNames = groupedArtists.map((group) => group.name);

      // Fetch the first 20 artists with duplicate names
      return this.prisma.artist.findMany({
        where: {
          name: {
            in: duplicateNames,
          },
        },
        orderBy: {
          name: 'asc',
        },
        take: 20,
      });
    }

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

  async deleteArtist(artistId: number) {
    return this.prisma.artist.delete({
      where: {
        id: artistId,
      },
    });
  }
}
