import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types';

const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  
  // If it's an ApiError, use its status code
  const statusCode = 'status' in err ? err.status as number : 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: message,
    status: statusCode,
  });
};

export default errorHandler;