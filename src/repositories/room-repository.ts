import prisma from "../database/client";
import { Prisma, Room, User } from "@prisma/client";

class RoomRepository {
  async create(data: Prisma.RoomCreateInput): Promise<Room> {
    const room = await prisma.room.create({ data });
    return room;
  }

  async findById(id: string): Promise<Room | null> {
    const room = await prisma.room.findUnique({ where: { id } });
    return room;
  }

  async update(id: string, data: Prisma.RoomUpdateInput): Promise<Room> {
    const room = await prisma.room.update({ where: { id }, data });
    return room;
  }

  async delete(id: string): Promise<Room> {
    const room = await prisma.room.delete({ where: { id } });
    return room;
  }

  async findAll(): Promise<Room[]> {
    const rooms = await prisma.room.findMany();
    return rooms;
  }

  async listPlayers(id: string) {
    const room = await prisma.room.findUnique({
      where: { id },
      select: { players: true },
    });
    return room;
  }

  async findByDate(time: Date): Promise<Room[] | null> {
    const room = await prisma.room.findMany({ where: { time } });
    return room;
  }
}

export default new RoomRepository();
