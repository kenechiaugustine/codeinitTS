/** @format */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user.model';
import { apiresponse } from '../../utils/api.response';
import { Email } from '../../utils/Email';

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
  // await new Email(user, url).send('welcome-email', `Welcome to this Platform`)
  return apiresponse(201, 'User created successfully', user, res);
};

export const registerWithGoogle = async (req: Request, res: Response) => {
  // Register users with google
  return apiresponse(
    201,
    'Register user with Google from this endpoint / func',
    null,
    res
  );
};
