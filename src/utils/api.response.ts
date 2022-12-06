import { Response } from "express";

export const apiresponse = (statusCode: number, message: String = "", data: any, res: Response) => {
    let status = ""
    if (statusCode >= 200 && statusCode < 300) status = "ok"
    status = "error"

    let results = data ? data.length : 0
    // Send Response
    return res.status(statusCode).json({
        status,
        results,
        message,
        data
    });
}
