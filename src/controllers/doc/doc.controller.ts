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
    if (!users || users.length == 0) throw new AppError('No Record found', 400);
    return apiresponse(200, 'Users Record found', users, res);
}

export const getOneUser = async (req: Request, res: Response) => {
    let user = await User.findById(req.params.id)
    if (!user) throw new AppError('No user record found', 400)
    return apiresponse(200, 'User Record found', user, res);
}

export const createUser = async (req: Request, res: Response) => {
    const newUser = await User.create(req.body)
    return apiresponse(201, 'User created', newUser, res);
}

export const updateUser = async (req: Request, res: Response) => {
    let user = await User.findById(req.params.id)
    if (!user) throw new AppError('No user record found', 400)
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    return apiresponse(200, 'User updated', user, res);
}

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) throw new AppError('No user record found', 400)
    return apiresponse(200, 'User deleted', null, res);
}
