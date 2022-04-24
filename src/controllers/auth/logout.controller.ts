
import { Response, Request, NextFunction } from 'express';


// import { User } from '../user/user.model';


export const logout = async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie('token')
    res.status(200).json({
        message: 'User logged out successfully'
    })

}