
import { Response, Request, NextFunction } from 'express';

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('token')
    res.status(200).json({
        status: 'ok',
        message: 'User logged out successfully',
        data: null
    })
}