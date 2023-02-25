import { Response, Request } from 'express';
import { apiresponse } from '../../utils/response';

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  return apiresponse(200, 'User logged out successfully', null, res);
};

// enquires
