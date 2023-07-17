import prisma from "../database";

class UserRepository {
  async readAll() {
    return await prisma.user.findMany();
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserRepository();
