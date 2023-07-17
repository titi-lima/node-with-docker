import prisma from "../database";
import { Prisma } from "@prisma/client";

class UserRepository {
  async readAll() {
    return await prisma.user.findMany();
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }
}

export default new UserRepository();
