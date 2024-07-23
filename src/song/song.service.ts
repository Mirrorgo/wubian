import { BadRequestException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { PrismaService } from 'src/prisma/prisma.service';
import { promisify } from 'util';
import * as fs from 'fs/promises';

// https://server.unimelb.top/public/music/test.webm
// STEP1:

const execPromise = promisify(exec);
@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}

  async getAllSongs() {
    // return this.prisma.song.findMany();
    // resturn songs and corresponding artist according to artistId in song
    return this.prisma.song.findMany({
      include: {
        artist: {
          select: {
            id: true,
            name: true,
          },
        },
        album: {
          select: {
            title: true,
          },
        },
      },
    });

    // const allSongs = await this.prisma.song.findMany({
    //   include: {
    //     artist: true,
    //   },
    // });
    // return allSongs;
    // return allSongs.map((song) => ({
    //   id: song.id,
    //   title: song.title,
    //   artist: song.artist,
    //   url: song.url,
    // }));
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
    url?: string;
    artistIds?: number[];
  }) {
    // Check if the song exists
    const song = await this.prisma.song.findUnique({
      where: {
        id: data.songId,
      },
    });

    if (!song) {
      throw new Error(`Song with ID ${data.songId} not found.`);
    }

    if (data.artistIds) {
      // Check if all artistIds exist
      const existingArtists = await this.prisma.artist.findMany({
        where: {
          id: {
            in: data.artistIds,
          },
        },
        select: {
          id: true,
        },
      });

      const existingArtistIds = existingArtists.map((artist) => artist.id);
      const missingArtistIds = data.artistIds.filter(
        (id) => !existingArtistIds.includes(id),
      );

      if (missingArtistIds.length > 0) {
        throw new Error(`Artist IDs not found: ${missingArtistIds.join(', ')}`);
      }
    }

    // Proceed with the update
    return this.prisma.song.update({
      where: {
        id: data.songId,
      },
      data: {
        title: data.title,
        url: data.url,
        artist: data.artistIds
          ? {
              set: data.artistIds.map((artistId) => ({
                id: artistId,
              })),
            }
          : undefined,
      },
    });
  }

  async deleteSong(songId: number) {
    return this.prisma.song.delete({
      where: {
        id: songId,
      },
    });
  }
  async downloadSong(url: string, filename: string): Promise<string> {
    const mp3Path = `public/server/music/${filename}.mp3`;
    const webmPath = `public/server/music/${filename}.webm`;

    // Step 1: Download the audio as MP3
    const downloadCommand = `yt-dlp -f bestaudio --extract-audio --audio-format mp3 -o "${mp3Path}" ${url}`;

    try {
      await execPromise(downloadCommand);
    } catch (error) {
      throw new BadRequestException(`下载音频时发生错误: ${error.message}`);
    }

    // Step 2: Convert MP3 to WebM
    const convertCommand = `ffmpeg -i "${mp3Path}" -c:a libopus "${webmPath}"`;

    try {
      await execPromise(convertCommand);
    } catch (error) {
      throw new BadRequestException(`转换音频时发生错误: ${error.message}`);
    }

    // Step 3: Delete the original MP3 file
    try {
      await fs.unlink(mp3Path);
    } catch (error) {
      throw new BadRequestException(`删除原始音频时发生错误: ${error.message}`);
    }

    return webmPath;
  }
}
