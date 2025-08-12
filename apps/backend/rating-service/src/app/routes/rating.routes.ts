import { Router } from 'express';
import { authMiddleware } from '@shared/auth';
import {
  createRating,
  updateRating,
  deleteRating,
  getRatingsByProduct,
} from '../controllers/rating.controller';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure the uploads directory exists before multer tries to save files
const uploadDir = path.resolve(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created upload directory at ${uploadDir}`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // use absolute path here
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
const router = Router();

router.post('/rate', authMiddleware(['buyer', 'buyer_seller']), upload.single('file'), createRating);
router.put('/:id', authMiddleware(['buyer', 'buyer_seller']), updateRating);
router.delete('/:id', authMiddleware(['buyer', 'buyer_seller']), deleteRating);
router.get('/product/:productId', getRatingsByProduct);

export default router;
