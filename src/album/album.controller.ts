import { Body, Controller, Post } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller({
  path: 'album',
  version: '1',
})
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Post('list')
  async getAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Post('add')
  async createAlbum(@Body() data: { title: string; artistId: number }) {
    return this.albumService.createAlbum(data);
  }

  @Post('update')
  async updateAlbum(
    @Body()
    data: {
      albumId: number;
      title?: string;
    },
  ) {
    return this.albumService.updateAlbum(data);
  }
}
