import { Response } from 'express';

export const apiresponse = (
  statusCode: number,
  message: String = '',
  data: any,
  res: Response
) => {
  const status = statusCode >= 200 && statusCode < 300 ? 'ok' : 'error';

  const results = data ? data.length : 0;
  // Send Response
  return res.status(statusCode).json({
    status,
    results,
    message,
    data,
  });
};
