import express, { Router } from 'express';

// Controller
import * as doc from '../controllers/doc/doc.controller';

// Utils
import uploader from '../utils/uploader';

// Router Definition
const router: Router = express.Router();
///////////////////////////////////////////////////

router
  .route('/users')
  .get(doc.getAllUsers) // Get all users
  .post(doc.createUser); // Create a user

router
  .route('/users/:id')
  .get(doc.getOneUser) // Get one user
  .put(doc.updateUser) // Update one user
  .delete(doc.deleteUser); // Delete one user

// Uploading single file
router.post('/upload', uploader.single('images'), (req, res) => {
  res.status(200).send({
    status: 'ok',
    message: 'Single file upload successful',
    // @ts-ignore
    data: req.file,
  });
});

////////////////////////////////////////////////////
export { router as docRouter };
