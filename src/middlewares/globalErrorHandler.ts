import { Request, Response, NextFunction } from 'express';
import AppError from './AppError'; // Ensure correct path

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let stack;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack
  });
};
