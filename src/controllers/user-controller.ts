import { Request, Response, NextFunction } from "express";
import { UserSchema, UpdateUserSchema } from "../DTOs";
import { UserRepository } from "../repositories";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = UserSchema.parse(req.body);

      const alreadyExists = await UserRepository.findByEmail(userData.email);

      if (alreadyExists) {
        return res.status(409).json({ message: "User already exists" });
      }

      const user = await UserRepository.create(userData);

      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;

      const user = await UserRepository.findById(user_id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async readByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      const user = await UserRepository.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserRepository.findAll();

      if (!users) {
        return res.status(404).json({ message: "Users not found" });
      }

      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;
      const userData = UpdateUserSchema.parse(req.body);

      const user = await UserRepository.update(user_id, userData);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;

      const user = await UserRepository.delete(user_id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async listRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const { room_id } = req.params;

      const rooms = await UserRepository.listRooms(room_id);

      return res.status(200).json(rooms);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new UserController();
