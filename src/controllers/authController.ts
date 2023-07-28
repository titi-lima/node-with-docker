import e, { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/userRepository"
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
        expiresIn: "1d",
      })

      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
        expiresIn: "30d",
      })

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        path: "/sessions",
        secure: true,
      });

      return res.status(200).json({ accessToken, user });
    } catch (err) {
      next(err);console.log(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refresh_token;

      if (!refreshToken) {
        delete req.headers.authorization;
        return next({
          status: 401,
          message: "Invalid token."
        });
      }

      const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET as string) as jwt.JwtPayload;

      if (!decodedToken) {
        delete req.headers.authorization;
        return next({
          status: 401,
          message: "Invalid token."
        });
      }

      const user = await UserRepository.findById(decodedToken.id);
      if (!user) {  
        return next({
          status: 400,
          message: "User not found."
        });
      }

      res.clearCookie("refresh_token", { path: "/sessions" });

      const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
        expiresIn: "30d",
      })

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
        expiresIn: "1d",
      })

      console.log(user)

      res.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        path: "/sessions",
        secure: true,
      });

      const { password: _, ...loggedUser } = user;

      return res.status(200).json({
        message: "Token refreshed.",
        data: {
          loggedUser,
          accessToken,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("refresh_token", { path: "/sessions" });

      return res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();