import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
  async insertUser(data: { name: string; email: string }) {
    return this.prisma.user.create({
      data,
    });
  }
}
