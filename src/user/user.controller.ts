import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/utils/current-user.decorator';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private userService: UserService) {}

  @Post('list')
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Post('add')
  async createUser(
    @Body() data: { name: string; email: string; password: string },
  ) {
    return this.userService.insertUser(data);
  }

  @Post('delete')
  async deleteUser(@Body() data: { userId: number }) {
    return this.userService.deleteUser(data.userId);
  }

  @Post('get')
  @UseGuards(JwtAuthGuard)
  async getUserById(@CurrentUser() user) {
    return this.userService.getUserById(user.id);
  }
}
