import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('audio')
export class AudioController {
  @Get(':filename')
  getAudio(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', 'public', filename);
    res.sendFile(filePath);
  }
}
