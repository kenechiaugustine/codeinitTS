import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import AppError from '../../errors/AppError';
import { apiresponse } from '../../utils/response';
import { Email } from '../../utils/Email';
import { User } from '../../models/user.model';

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new AppError('User not found', 404);
  // @ts-ignore
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/auth/reset-password?token=${token}`;
  await new Email(user, url).send('reset-password', 'Reset your password');
  console.log(url);
  return apiresponse(200, 'Reset Password Link Sent to Email', null, res);
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.query;
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new AppError('User not found', 404);
  // @ts-ignore
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) throw new AppError('Invalid Token', 400);
  // @ts-ignore
  if (decoded.id !== user._id.toString()) {
    throw new AppError('Invalid Token', 400);
  }
  user.password = newPassword;
  await user.save();
  return apiresponse(200, 'Password Updated', null, res);
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  // @ts-ignore
  const user = await User.findOne({ email: req.user.email }).select(
    '+password'
  );
  if (!user) throw new AppError('User not found', 404);

  if (!(await user.correctPassword(oldPassword, user.password))) {
    throw new AppError('Your old password is wrong.', 401);
  }
  user.password = newPassword;
  await user.save();
  return apiresponse(200, 'Password Changed', null, res);
};
