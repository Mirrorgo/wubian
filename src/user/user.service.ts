import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  // async getUserById(userId: number) {
  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async insertUser(data: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }
  async updateUser(data: {
    userId: number;
    name?: string;
    email?: string;
    password?: string;
  }) {
    return this.prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
