import { Request, Response, NextFunction } from 'express'


// import { User } from './user.model';



export const getUser = async (req: Request, res: Response, next: NextFunction) => {

    return res.send('Hi champ!');

    next();

}



