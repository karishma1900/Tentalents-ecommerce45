import { Router } from 'express';
import { initiatePayment, verifyPayment } from '../controllers/payment.controller';
import { authMiddleware, requireRole } from '@shared/auth';

const router = Router();

// 🧾 Initiate a payment
router.post(
  '/',
  authMiddleware(['buyer', 'buyer_seller']),
  initiatePayment
);

// ✅ Verify payment status
router.get(
  '/',
  authMiddleware(),
  requireRole('buyer', 'buyer_seller'),
  verifyPayment
);


export default router;
