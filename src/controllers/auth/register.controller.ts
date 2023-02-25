import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { apiresponse } from '../../utils/response';
import { Email } from '../../utils/Email';
import { User } from '../../models/user.model';

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  const user = await User.create({ email, password, firstName, lastName });
  //@ts-ignore
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie('token', token);
  // Create Verification URL
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/auth/verify-email?token=${token}`;
  // Send Welcome Email
  await new Email(user, url).send('welcome-email', `Welcome to this Platform`);
  return apiresponse(201, 'User registered successfully', user, res);
};
