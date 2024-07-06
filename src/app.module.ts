import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AudioService } from './audio/audio.service';
import { AudioController } from './audio/audio.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, UserController, AudioController],
  providers: [AppService, UserService, AudioService],
})
export class AppModule {}
