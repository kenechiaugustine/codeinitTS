import { Request, Response, NextFunction } from 'express'
import { User } from '../../models/user.model';

import AppError from '../../errors/AppError';

import AppQueryFeatures from '../../utils/AppQueryFeatures';

import { apiresponse } from '../../utils/api.response';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    let filter = {}

    if (req.params.id) filter = { user: req.params.id }

    const features = new AppQueryFeatures(User.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    //@ts-ignore
    const users = await features.query;

    if (!users || users.length == 0) throw new AppError('Zero Record found', 400);

    apiresponse(200, 'Users Record found', users, res);
}

export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findById(req.params.id)

    if (!user) throw new AppError('No user record found', 400)

    apiresponse(200, 'User Record found', user, res);

}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const newUser = await User.create(req.body)

    apiresponse(201, 'User created', newUser, res);

    return;
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

    let user = await User.findById(req.params.id)

    if (!user) throw new AppError('No user record found', 400)

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    apiresponse(200, 'User updated', user, res);

    return;
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) throw new AppError('No user record found', 400)

    apiresponse(200, 'User deleted', null, res);

    return;
}