import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


// import { User } from './user.model';

const JWT_SECRET = "kene"


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



export const token  = async (req: Request, res: Response, next: NextFunction) => {

    const user = {
        _id: "aklfjealfafa"
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET)
    res.cookie('token', token)
    res.status(200).json({
        message: 'User logged in successfully',
        success: true,
        token
    })

}