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

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
