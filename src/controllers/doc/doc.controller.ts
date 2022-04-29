import { Request, Response, NextFunction } from 'express'
import { User } from '../../models/user.model';

import AppError from '../../errors/AppError';

import AppQueryFeatures from '../../utils/AppQueryFeatures';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    let filter = {}

    // if (req.params.id) filter = { user: req.params.id }

    const features = new AppQueryFeatures(User.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    //@ts-ignore
    const users = await features.query;
    if (!users || users.length == 0) throw new AppError('Zero Record found', 400);
    
    return res.status(200).json({
        message: "Success",
        result: users.length,
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