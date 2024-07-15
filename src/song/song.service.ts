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

  async deleteSong(songId: number) {
    return this.prisma.song.delete({
      where: {
        id: songId,
      },
    });
  }
  async downloadSong(url: string, filename: string): Promise<string> {
    const mp3Path = `public/music/${filename}.mp3`;
    const webmPath = `public/music/${filename}.webm`;

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
