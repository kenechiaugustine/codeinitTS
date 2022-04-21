import { Request, Response, NextFunction } from 'express'
import { User } from '../../models/user.model';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const users = await User.find()
        return res.status(200).json({
            message: "Success",
            data: users
        })
    } catch (error) {
        return res.status(400).json({
            message: "Error occurred..."
        })
    }

    next();
}


export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = await User.findById(req.params.id)
        let state;
        if(!user) state = null
        state = user

        res.status(200).json({
            message: "Success",
            data: state
        })

        return;
    } catch (error) {
        res.status(500).json({
            message: 'Failed',
            data: error
        })

        return;
    }

    next()
}



export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await User.create(req.body)

        res.status(201).json({
            message: "Success",
            data: newUser
        })

        return;
    } catch (error) {
        res.status(400).json({
            message: 'Failed',
            data: error
        })

        return;
    }

    next()
}


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)

        res.status(200).json({
            message: "Success",
            data: user
        })

        return;
    } catch (error) {
        res.status(400).json({
            message: "Failed",
            data: error
        })
        return;
    }
}



export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {


        await User.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Success",
            data: null
        })

        return;
    } catch (error) {
        res.status(400).json({
            message: "Failed",
            data: error
        })

        return;
    }
}