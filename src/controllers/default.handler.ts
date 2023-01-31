/** @format */

import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import AppQueryFeatures from '../utils/AppQueryFeatures';
import { apiresponse } from '../utils/api.response';

// Create
export const createOne =
  (Model: any) => async (req: Request, res: Response) => {
    const newDoc = await Model.create(req.body);
    return apiresponse(201, 'Created successfully', newDoc, res);
  };

// Read all
export const getAll =
  (Model: any, docField?: any) => async (req: Request, res: Response) => {
    let filter = {};
    if (req.params.id) filter = { docField: req.params.id };
    const features = new AppQueryFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    //@ts-ignore
    const docs = await features.query;
    if (!docs || docs.length == 0) throw new AppError('No record found', 400);
    return apiresponse(200, `All Record found`, docs, res);
  };

// Read one
export const getOne =
  (Model: any, popOptions?: any) => async (req: Request, res: Response) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc || doc.length == 0) new AppError('No record found', 404);
    return apiresponse(200, `Record found`, doc, res);
  };

// Update
export const updateOne =
  (Model: any) => async (req: Request, res: Response) => {
    let doc = await Model.findById(req.params.id);
    if (!doc) throw new AppError('No record found', 400);
    doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return apiresponse(200, 'Updated successfully', doc, res);
  };

// Soft Delete
export const deleteOne =
  (Model: any) => async (req: Request, res: Response) => {
    let doc = await Model.findById(req.params.id);
    if (!doc) throw new AppError('No record found', 400);
    doc = await Model.findByIdAndUpdate(req.params.id, { isActive: false });
    return apiresponse(200, 'Deleted successfully', null, res);
  };

// Delete or remove entirely
export const removeOne =
  (Model: any) => async (req: Request, res: Response) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) throw new AppError('No doc record found', 400);
    return apiresponse(200, 'Removed successfully', null, res);
  };
