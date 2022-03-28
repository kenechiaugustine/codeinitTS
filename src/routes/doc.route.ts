import express, { Router } from 'express'

const router: Router = express.Router();

import * as doc from '../controllers/doc/doc.controller';


// Get all users
router.get('/get-user', doc.getUser);


// Create a new user
router.post('/create', doc.createUser);






export { router as docRouter}