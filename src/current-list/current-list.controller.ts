import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentlistService } from './current-list.service';
import { CurrentUser } from 'src/utils/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller({
  path: 'current-list',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class CurrentlistController {
  constructor(private currentListService: CurrentlistService) {}
  // @Post('get')
  // async getCurrentListByUserId(@CurrentUser() user) {
  //   // console.log(user, 'user!!!');
  //   return this.currentListService.getCurrentListByUserId(user.id);
  // }

  @Post('add-song')
  // 可以连续添加同一首歌到末尾的位置，
  async addSongToCurrentList(
    @CurrentUser() user,
    @Body() data: { songId: number },
  ) {
    return this.currentListService.addSongToCurrentList({
      userId: user.id,
      songId: data.songId,
    });
  }

  // @Post('empty')
  // async emptyCurrentListByUserId(@CurrentUser() user) {
  //   return this.currentListService.emptyCurrentListByUserId(user.id);
  // }
}
