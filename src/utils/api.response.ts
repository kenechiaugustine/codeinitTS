import { Request, Response } from "express";

export const apiresponse = (statusCode: number, message: String = "", data: any, res: Response,) => {
    let status = ""

    if (statusCode >= 200 && statusCode < 300) {
        status = "ok"
    } else {
        status = "error"
    }

    res.status(statusCode).json({
        status,
        message,
        data
        //results --> doc.length
        //page --> current page
    });

    return;
}
