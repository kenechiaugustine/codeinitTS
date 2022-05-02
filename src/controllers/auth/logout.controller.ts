import { Response, Request, NextFunction } from 'express';
import { apiresponse } from '../../utils/api.response';

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('token')
    apiresponse(200, 'User logged out successfully', null, res);
}