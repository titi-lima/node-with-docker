import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      res.status(401).json({
        message: 'Unauthorized.',
      });
    } else {
      const [, token] = authToken.split(' ');

      jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string);
      next();
    }
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}