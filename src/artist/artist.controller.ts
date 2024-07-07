import { Body, Controller, HttpCode, Post, Version } from '@nestjs/common';
import { ArtistService } from './artist.service';

// @Controller('artist')
@Controller({
  path: 'artist',
  version: '1',
})
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Post('list')
  // @Version('2')
  async getArtists() {
    return this.artistService.getAllArtists();
  }

  @Post('get')
  async getArtistById(@Body() body: { artistId: number }) {
    const { artistId } = body;
    return this.artistService.getArtistById(artistId);
  }

  @Post('add')
  async createArtist(@Body() body: { name: string }) {
    const { name } = body;
    return this.artistService.createArtistOnly({ name });
  }
}
