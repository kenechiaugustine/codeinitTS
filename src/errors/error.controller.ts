// import {Request, Response, NextFunction} from 'express'
import AppError from './AppError'



//@ts-ignore
const sendError = (err, req, res, next) => {

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // console.log(JSON.stringify(err))
    // console.log(err.name)
    console.log(err)
    return res.status(500).send('Something went very wrong!!');
}



//@ts-ignore
export = (err, req, res, next) => {

    let error = { ...err }
    error.message = err.message

    if (err.name === 'CastError') {
        const message = `Invalid ${err.path}: ${err.value}.`;
        error = new AppError(message, 400);
    }

    if (err.code === 11000) {
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        const message = `Duplicate field value: ${value}. Please use another value!`;
        error = new AppError(message, 400);
    }

    if (err.name === 'ValidationError') {
        //@ts-ignore
        const errors = Object.values(err.errors).map(el => el.message);
        const message = `Invalid input data. ${errors.join('. ')}`;
        error =  new AppError(message, 400);
    }

    if (err.type === 'entity.parse.failed'){
        error = new AppError('Invalid JSON data', 400)
    }

    sendError(error, req, res, next)
}

