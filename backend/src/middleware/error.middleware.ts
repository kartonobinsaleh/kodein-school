import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handler middleware
// Express uses 4 arguments to identify error handlers
export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  // Log error with Winston: include stack trace (captured by winston.format.errors), 
  // and request context from the provided Request object.
  logger.error(message, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    statusCode,
  });

  // Return clean JSON response (without technical stack trace)
  res.status(statusCode).json({
    success: false,
    message,
  });
};
