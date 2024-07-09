import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';

@Controller({
  path: 'playlist',
  version: '1',
})
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}
  @Post('list')
  async getPlaylists() {
    return this.playlistService.getAllPlaylists();
  }

  @Post('add')
  async createPlaylist(@Body() data: { title: string; userId: number }) {
    return this.playlistService.createPlaylist(data);
  }

  @Post('update-name')
  async updatePlaylistName(
    @Body()
    data: {
      playlistId: number;
      title?: string;
    },
  ) {
    return this.playlistService.updatePlaylistName(data);
  }

  @Post('add-song')
  async addSongToPlaylist(
    @Body()
    data: {
      playlistId: number;
      songId: number;
    },
  ) {
    return this.playlistService.addSongToPlaylist(data);
  }
}
