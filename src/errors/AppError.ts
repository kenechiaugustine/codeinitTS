export default class AppError extends Error {
    //@ts-ignore
    constructor(message, statusCode) {
        super(message);
        //@ts-ignore
        this.statusCode = statusCode
        //@ts-ignore
        this.status = `${statusCode}`.startsWith('4') ? 'error' : 'failed'
        //@ts-ignore
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor);
    }
}
