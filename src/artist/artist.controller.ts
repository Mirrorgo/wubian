import { Controller, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Post('list')
  async getArtists() {
    return this.artistService.getAllArtists();
  }

  @Post('add')
  async createArtist({ name }: { name: string }) {
    return this.artistService.createArtistOnly({ name });
  }
}
