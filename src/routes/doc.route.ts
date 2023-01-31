/** @format */

import express, { Router } from 'express';
import * as doc from '../controllers/doc/doc.controller';
import { validate } from '../middlewares/validate';
import * as authValidator from '../validators/auth.validators';

const router: Router = express.Router();

// Get all users
router.get('/users', doc.getAllUsers);
// Get one user
router.get('/users/:id', doc.getOneUser);
// Create a new user
router.post('/users', validate(authValidator.register), doc.createUser);
// Update a user
router.put('/users/:id', doc.updateUser);
// Delete a  user
router.delete('/users/:id', doc.deleteUser);

export { router as docRouter };
