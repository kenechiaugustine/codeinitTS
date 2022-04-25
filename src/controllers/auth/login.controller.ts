import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { apiresponse } from '../../utils/api.response'
import { User } from '../../models/user.model'


const JWT_SECRET = "kene"


export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return apiresponse(400, 'Please provide email and password', null, res);
    }

    try {
        const user = await User.findOne({ email })

        //.select('+password');

        //@ts-ignore
        if (!user || !(await user.correctPassword(password, user.password))) {
            return apiresponse(401, 'Incorrect email or password', null, res);
        }

        // Remove JWT_SECRET from response to prevent security breach. process.env.JWT_SECRET
        const token = jwt.sign({ id: user._id }, JWT_SECRET)
        res.cookie('token', token)

        apiresponse(200, 'User logged in successfully', user, res);

    } catch (error) {
        console.log(error)
        apiresponse(500, 'Error logging in user', null, res);
    }

}


export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {

    // Login users with google
    apiresponse(201, 'Login user with Google from this endpoint / func', null, res);

}