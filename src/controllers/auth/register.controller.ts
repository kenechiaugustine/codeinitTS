import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


import { User } from '../../models/user.model';
import { apiresponse } from '../../utils/api.response';


const JWT_SECRET = "kene"



export const register = async (req: Request, res: Response) => {

    const { email, password, name } = req.body;

    try {
        const user = await User.create({ email, password, name })

        // Remove JWT_SECRET from response to prevent security breach. process.env.JWT_SECRET
        const token = jwt.sign({ id: user._id }, JWT_SECRET)
        res.cookie('token', token)

        apiresponse(201, 'User created successfully', user, res);

    } catch (error) {
        
        //@ts-ignore
        if (error.code === 11000) {
            apiresponse(400, 'User already exists', null, res);
        }
        //@ts-ignore
        else if (error.name === 'ValidationError') {
            //@ts-ignore
            apiresponse(400, `${error.message}`, null, res);
        }
        else {
            apiresponse(500, 'Error creating user', null, res);
        }
    }
}


export const registerWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    // Register users with google
    apiresponse(201, 'Register user with Google from this endpoint / func', null, res);
}


