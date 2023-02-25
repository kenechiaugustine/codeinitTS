import { Request, Response } from 'express';
import AppError from '../errors/AppError';
import { apiresponse } from '../utils/response';
import AppQuery, { QueryString } from '../utils/query';

// Create
export const createOne =
  (Model: any) => async (req: Request, res: Response) => {
    const newDoc = await Model.create(req.body);
    return apiresponse(201, 'Created successfully', newDoc, res);
  };

// Read all
export const getAll =
  (Model: any, docField?: any) => async (req: Request, res: Response) => {
    let filter: { [key: string]: any } = {};
    if (req.params.id) filter = { [docField]: req.params.id };
    const features = new AppQuery(Model.find(filter), req.query as QueryString)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.modelQuery;
    if (!docs || docs.length == 0) throw new AppError('No record found', 400);
    return apiresponse(200, `All Record found`, docs, res);
  };

// Read one
export const getOne =
  (Model: any, popOptions?: any) => async (req: Request, res: Response) => {
    let query = Model.findOne({ _id: req.params.id, isDeleted: false });
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) throw new AppError('No record found', 404);
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

// Delete or remove entirely
export const removeOne =
  (Model: any) => async (req: Request, res: Response) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) throw new AppError('No record found', 400);
    return apiresponse(200, 'Removed successfully', null, res);
  };

// ⚠️ Soft Delete
export const deleteOne =
  (Model: any) => async (req: Request, res: Response) => {
    let doc = await Model.findById(req.params.id);
    if (!doc) throw new AppError('No record found', 400);
    doc = await Model.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return apiresponse(200, 'Deleted successfully', null, res);
  };
