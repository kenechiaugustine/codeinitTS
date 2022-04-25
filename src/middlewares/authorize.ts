import {Request, Response, NextFunction} from 'express'

// @ts-ignore
export function authorize(...roles) {
    return async (req: Request, res: Response, next: NextFunction) => {

        // Get the user from the request
        // @ts-ignore
        const user = req.user;

        // check role privileges
        if (!roles.includes(user.role)) {
            return res.status(403).json({
                status: 'error',
                message: 'You are not authorized to access this resource',
                data: null
            });
        }
        
        next()
    }
}
