import { Request, Response, NextFunction } from 'express'


import { User } from '../../models/user.model';



export const getUser = async (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({
        message: 'Get all users ...',
        data: null
    })

    next();

}




export const createUser =async (req: Request, res: Response, next: NextFunction) => {
    const newU = {
        firstName: "Kene",
        lastName: "James",
        email: "kenechiaugustine@gmail.com",
        phone: '12121212121',
        password: '212122121212'
    }
    // const newUser = await User.create()
}



