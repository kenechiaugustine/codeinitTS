import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { apiresponse } from '../../utils/api.response'
import { User } from '../../models/user.model'
import AppError from '../../errors/AppError'


export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) throw new AppError('Please provide email and password', 400);

    const user = await User.findOne({ email }).select('+password');

    //@ts-ignore
    if (!user || !(await user.correctPassword(password, user.password))) {
       throw new AppError('Incorrect email or password', 401);
    }

    //@ts-ignore
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.cookie('token', token)

    apiresponse(200, 'User logged in successfully', user, res);

    return;
}


export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    // Login users with google
    apiresponse(201, 'Login user with Google from this endpoint / func', null, res);
    return
}