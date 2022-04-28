//@ts-ignore
import AppError from './AppError'

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


    
    sendError(error, req, res, next)
}



//@ts-ignore
const sendError = (err, req, res, next) => {

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    console.log(err)
    return res.send('Something went very wrong!!');
}
