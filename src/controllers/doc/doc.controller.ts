import * as doc from './../default.handler';
import { User } from '../../models/user.model';

export const getAllUsers = doc.getAll(User);

export const getOneUser = doc.getOne(User);

export const createUser = doc.createOne(User);

export const updateUser = doc.updateOne(User);

export const deleteUser = doc.removeOne(User);
