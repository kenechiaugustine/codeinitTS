import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'


const JWT_SECRET = "kene"

// console.log(process.env.JWT_SECRET)

export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {

    try {
        // check if user is logged in
        const token = req.cookies.token;
        if (!token) return res.status(401).json({
            status: 'error',
            message: 'You are not logged in',
            data: null
        });

        // validate token
        // replace the JWT_SECRET with the actual secret: process.env.JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET)
        if (!decoded) return res.status(400).json({
            status: 'error',
            message: 'Invalid token',
            data: null
        });

        // check user from token
        //@ts-ignore
        const user = await User.findById(decoded.id)
        if (!user) return res.status(400).json({
            status: 'error',
            message: 'No user found in this token. Login again',
            data: null
        });

        //@ts-ignore
        req.user = user;

        next()
    } catch (error) {
        // console.log(error)
        //@ts-ignore
        if (error.name === 'JsonWebTokenError') {
            res.status(400).json({
                status: 'error',
                message: 'Invalid token. Login again',
                data: null
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Something went wrong. Try again',
                data: null
            });
        }
    }

}
