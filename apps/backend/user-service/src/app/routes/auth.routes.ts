import { Router } from 'express';
import {
  registerUser,
  loginUser,
  googleLogin
} from '../controllers/user.controller';

const router = Router();

// Public routes — no authentication required
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);

export default router;
