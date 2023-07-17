import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = error.message || "Internal server error";
  let status = error.status || 500;
  if (error instanceof ZodError) {
    status = 400;
    message = error.issues[0].message;
  }

  return res.status(status).json({ message });
};

export default errorHandler;
