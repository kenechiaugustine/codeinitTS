import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import AppError from './AppError';

const sendError: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.log(err);
  return res.status(500).json({
    status: err.status,
    message: 'Something went very wrong!!!',
  });
};

export = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === 'CastError') {
    const message = `Invalid ${err.path}: ${err.value}.`;
    error = new AppError(message, 400);
  }

  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    error = new AppError(message, 400);
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    error = new AppError(message, 400);
  }

  if (err.type === 'entity.parse.failed') {
    error = new AppError('Invalid JSON data', 400);
  }

  if (err.name === 'MulterError') {
    const message = err.message + ': ' + err.field;
    error = new AppError(message, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new AppError('Your token has expired!', 401);
  }

  if (err.code === 'ENOENT' && err.errno === -2) {
    const message = `File uploading error: ${err.message}`;
    error = new AppError(message, 401);
  }

  sendError(error, req, res, next);
};
