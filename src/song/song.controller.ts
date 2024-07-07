import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SongService } from './song.service';

@Controller({
  path: 'song',
  version: '1',
})
export class SongController {
  constructor(private songService: SongService) {}
  @Post('list')
  async getSongs() {
    return this.songService.getAllSongs();
  }

  @Post('add')
  async createSong(@Body() data: { title: string; artistId: number }) {
    return this.songService.createSong(data);
  }

  @Post('update')
  async updateSong(
    @Body()
    data: {
      songId: number;
      title?: string;
      artistId?: number;
      url?: string;
    },
  ) {
    return this.songService.updateSong(data);
  }
}
