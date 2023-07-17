import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const errorHandler = (
  err: Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status;
  let message;

  if (err instanceof ZodError) {
    status = 400;
    message = err.issues[0].message;
  }

  return res.status(status || 500).json({ message: message });
}

export default errorHandler;