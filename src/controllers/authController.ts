import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/userRepository"
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserRepository.findByEmail(email);

      if (!user) {
        throw new Error("Incorrect parameters.");
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Incorrect parameters.");
      }

      const accessToken = jwt.sign({ id: user.id }, 'farniubntuibnjouwtwe', {
        expiresIn: "1d",
      })

      const refreshToken = jwt.sign({ id: user.id }, 'gaerguarngnruea', {
        expiresIn: "30d",
      })

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/sessions",
        secure: true,
      });

      return res.status(200).json({ accessToken, user });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("refreshToken", { path: "/sessions" });

      return res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
}