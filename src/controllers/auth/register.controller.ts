import { Request, Response, NextFunction } from 'express';


// import { User } from '../user/user.model';



export const register = async (req: Request, res: Response, next: NextFunction) => {
    
    return res.status(200).json({
        message: 'Register user from this endpoint / func',
        data: null
    })
    
    next();
    
}


export const registerWithGoogle = async (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({
        message: 'Register user with Google from this endpoint / func',
        data: null
    })
}


