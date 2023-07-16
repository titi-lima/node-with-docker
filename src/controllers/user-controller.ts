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
    }
  }
}