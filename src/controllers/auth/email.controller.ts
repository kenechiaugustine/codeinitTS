import AppError from "../../errors/AppError";
import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user.model";
import jwt from "jsonwebtoken";
import { Email } from "../../utils/Email";
import { apiresponse } from "../../utils/api.response";



export const sendVerificationEmail = async (req: Request, res: Response, next: NextFunction) => {

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Generate token
    // @ts-ignore
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // create verify URL
    const url = `${req.protocol}://${req.get('host')}/api/auth/verify-email?token=${token}`

    // Send token to user's email
    await new Email(user, url).send('verify-email', 'Verify Your Email');

    return apiresponse(200, 'Verification email sent', null, res);

}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {

    const { token } = req.query;

    if (!token) {
        throw new AppError('Token is missing', 400);
    }

    // Verify token
    // @ts-ignore
    const decoded = JSON.stringify(jwt.verify(token, process.env.JWT_SECRET))

    if (!decoded) {
        throw new AppError('Invalid token', 400);
    }

    // Find user by id
    // @ts-ignore
    const user = await User.findById(decoded.id);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Update user's email verified to true
    // @ts-ignore
    user.isEmailVerified = true;
    // console.log('Your Email is activated'+ user.isEmailVerified)
    await user.save();

    return apiresponse(200, 'Email verified', null, res);

}