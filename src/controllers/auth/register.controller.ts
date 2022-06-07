import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user.model';
import { apiresponse } from '../../utils/api.response';
import { Email } from '../../utils/Email';


export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password, name } = req.body;

    const user = await User.create({ email, password, name })

    //@ts-ignore
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.cookie('token', token)

    // Send Welcome Email
    // await new Email(user, url).send('welcome', `You're welcome to this Platform`)
    
    apiresponse(201, 'User created successfully', user, res);

    return;
}


export const registerWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    // Register users with google
    apiresponse(201, 'Register user with Google from this endpoint / func', null, res);
    return;
}


