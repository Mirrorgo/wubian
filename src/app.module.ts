import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { SongController } from './song/song.controller';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { PlaylistController } from './playlist/playlist.controller';
import { PlaylistService } from './playlist/playlist.service';
import { AlbumService } from './album/album.service';
import { ArtistService } from './artist/artist.service';
import { SongService } from './song/song.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response.interceptor';

@Module({
  imports: [PrismaModule],
  controllers: [
    AppController,
    UserController,
    SongController,
    ArtistController,
    AlbumController,
    PlaylistController,
  ],
  providers: [
    AppService,
    UserService,
    PlaylistService,
    AlbumService,
    ArtistService,
    SongService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
