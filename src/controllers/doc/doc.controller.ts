import { Request, Response, NextFunction } from 'express'
import { User } from '../../models/user.model';

import AppError from '../../errors/AppError';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find()
    if(!users) return next(new AppError('No record found', 400))
    return res.status(200).json({
        message: "Success",
        data: users
    })
}


export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findById(req.params.id)
    
    if (!user) throw new AppError('No user record found', 400)

    res.status(200).json({
        message: "Success",
        data: user
    })
    
}



export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const newUser = await User.create(req.body)

    res.status(201).json({
        message: "Success",
        data: newUser
    })

    return;
}


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body)

    res.status(200).json({
        message: "Success",
        data: user
    })

    return;
}



export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        message: "Success",
        data: null
    })

    return;
}