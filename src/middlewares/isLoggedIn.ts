import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'


const JWT_SECRET = "kene"

// console.log(process.env.JWT_SECRET)

export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {

    try {
        // check if user is logged in
        const token = req.cookies.token;
        if (!token) return res.status(401).json('You are not logged in');

        // validate token
        const decoded = jwt.verify(token, JWT_SECRET)
        if (!decoded) return res.status(400).json('Invalid token. Login again');

        // check user from token
        //@ts-ignore
        // const user = await User.findById(decoded.id)
        // if (!user) return res.status(400).json('No user found in this token. Login again');

        const user = {
            role: 'admin'
        }

        //@ts-ignore
        req.user = user;

        // console.log(req.user)

        next()
    } catch (error) {
        // console.log(error)
        //@ts-ignore
        if (error.name === 'JsonWebTokenError') {
            res.status(400).json('Invalid token. Login again');
        } else {
            res.status(400).json('Invalid token. Login again');
        }
    }

}