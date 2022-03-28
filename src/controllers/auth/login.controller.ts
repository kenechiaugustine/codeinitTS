import { Request, Response, NextFunction } from 'express'


// import { User } from './user.model';



export const login = async (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({
        message: 'Sign in user from this endpoint / func',
        data: null
    })

    next();

}


export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
    
    return res.status(200).json({
        message: 'Sign in user with google from this endpoint / func',
        data: null
    })
    
    next();
    
}



