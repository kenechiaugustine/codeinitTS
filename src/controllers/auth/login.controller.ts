import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import AppError from '../../errors/AppError';
import { apiresponse } from '../../utils/response';
import { User } from '../../models/user.model';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new AppError('Please provide email and password', 400);
  const user = await User.findOne({ email }).select('+password');
  //@ts-ignore
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }
  //@ts-ignore
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie('token', token);
  return apiresponse(200, 'User logged in successfully', user, res);
};
