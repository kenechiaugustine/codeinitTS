import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import AppError from '../../errors/AppError';
import { apiresponse } from '../../utils/response';
import { Email } from '../../utils/Email';
import { User } from '../../models/user.model';

export const sendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new AppError('User not found', 404);
  // Generate token
  // @ts-ignore
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  // create verify URL
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/auth/verify-email?token=${token}`;
  // Send token to user's email
  await new Email(user, url).send('verify-email', 'Verify Your Email');
  console.log(url);
  return apiresponse(200, 'Verification email sent', null, res);
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;
  // Verify token
  // @ts-ignore
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) throw new AppError('Invalid token', 400);
  // Find user by id
  // @ts-ignore
  const user = await User.findById(decoded.id);
  if (!user) throw new AppError('User not found', 404);
  // Update user's email verified to true
  // @ts-ignore
  user.isEmailVerified = true;
  await user.save();
  return apiresponse(200, 'Email verified', user, res);
};
