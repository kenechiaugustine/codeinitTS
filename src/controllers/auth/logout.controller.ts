
import { Response, Request, NextFunction } from 'express';


// import { User } from '../user/user.model';


export const logout = async (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({
        message: 'Sign out user from this endpoint / func',
        data: null
    })

    next();

}