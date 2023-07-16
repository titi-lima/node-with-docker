import prisma from "src/database/client";
import { Prisma, User } from "@prisma/client";

class UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  };

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  };

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async listRooms(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { rooms: true },
    });
    return user;
  }
}

export default new UserRepository();