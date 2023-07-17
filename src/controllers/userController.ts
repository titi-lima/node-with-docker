import { NextFunction, Request, Response } from "express";
import userRepository from "../repositories/userRepository";

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
}

export default new UserController();
