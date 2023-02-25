import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { User } from '../models/user.model';

export async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // check if user is logged in
  const token = req.cookies.token;
  if (!token) throw new AppError('You are not logged in!', 401);

  // validate token
  //@ts-ignore
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) throw new AppError('Invalid token!', 401);

  // check user from token
  //@ts-ignore
  const user = await User.findById(decoded.id);
  if (!user) throw new AppError('User not found!', 401);

  //@ts-ignore
  req.user = user;
  next();
}

// @ts-ignore
export function authorize(...roles) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Get the user from the request
    // @ts-ignore
    const user = req.user;

    // check role privileges
    if (!roles.includes(user.role)) {
      throw new AppError(
        'You are not authorized to access this resource!',
        403
      );
    }

    next();
  };
}
