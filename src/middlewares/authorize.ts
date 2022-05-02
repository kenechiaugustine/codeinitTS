import {Request, Response, NextFunction} from 'express'
import AppError from '../errors/AppError';

// @ts-ignore
export function authorize(...roles) {
    return async (req: Request, res: Response, next: NextFunction) => {

        // Get the user from the request
        // @ts-ignore
        const user = req.user;

        // check role privileges
        if (!roles.includes(user.role)) {
           throw new AppError('You are not authorized to access this resource!', 403);
        }
        
        next()
    }
}
