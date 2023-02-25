// @ts-ignore
import multer from 'multer';
import path from 'path';

const storageEngine = multer.diskStorage({
  // @ts-ignore
  destination: (req, file, cb) => {
    cb(null, './src/uploads');
  },
  // @ts-ignore
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  },
});

const uploader = multer({
  storage: storageEngine,
});

export default uploader;
