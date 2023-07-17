import { NextFunction, Request, Response } from "express";
import userRepository from "../repositories/userRepository";
import { userSchema, userUpdateSchema } from "src/DTOs/User";

class UserController {
  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepository.readAll();
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    // http://localhost:3000/users/1
    try {
      const { id } = req.params;

      await userRepository.delete(id);

      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = userSchema.parse(req.body);

      const user = await userRepository.create(userData);

      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userData = userUpdateSchema.parse(req.body);

      const user = await userRepository.update(id, userData);

      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
