import { Request, Response, NextFunction } from "express";
import userRepository from "src/repositories/userRepository";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await userRepository.findByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'Incorrect parameters' });
      }

      if (password !== user.password) {
        return res.status(401).json({ error: 'Incorrect parameters' });
      }

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: '30s',
      });

      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET as string, {
        expiresIn: '1d',
      });

      req.cookies('refresh_token', refreshToken, {
        httpOnly: true,
      })

      return res.status(200).json({ accessToken });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      req.cookies('refresh_token', '', {
        httpOnly: true,
      })

      delete req.headers.authorization;

      return res.status(200).json({ message: 'Logout successfully' });
    } catch (err) {
      next(err);
    }
  }
}