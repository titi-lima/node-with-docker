import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message;
  let status;
  if (error instanceof ZodError) {
    status = 400;
    message = error.issues[0].message;
  }

  return res.status(status || 500).json({ message });
};

export default errorHandler;
