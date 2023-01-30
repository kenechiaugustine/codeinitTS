/** @format */

import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import AppQueryFeatures from '../utils/AppQueryFeatures';
import { apiresponse } from '../utils/api.response';

export const getAll = (Model: any) => async (req: Request, res: Response) => {
  let filter = {};
  if (req.params.id) filter = { user: req.params.id };
  const features = new AppQueryFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  //@ts-ignore
  const doc = await features.query;
  if (!doc || doc.length == 0) throw new AppError('No Record found', 400);
  return apiresponse(200, `Records found`, doc, res);
};
