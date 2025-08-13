import { Router } from 'express';
import multer from 'multer';

import {
  updateVendor,
  getVendorById,
  getAllVendors,
  deleteVendor,
  uploadVendorDocuments,
  approveVendor,
  rejectVendor,
  getVendorAnalytics,
  convertUserToVendor,
  initiateVendorRegistrationOtp,
  verifyVendorEmailOtp,
  completeVendorUserRegistration,
  completeVendorProfileRegistration,
 getVendorProfileByVendorId,
 updateVendorProfile,
  loginVendor
} from '../controllers/vendor-controller';

import { authMiddleware } from '@shared/auth';
import { UserRole } from '@shared/types';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isAccepted = file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/');
    if (!isAccepted) {
      return cb(new Error('Only images or documents are allowed'));
    }
    cb(null, true);
  },
});
router.get('/vendor/profile/:vendorId', authMiddleware(), getVendorProfileByVendorId);
// === Public registration routes (no auth) ===
router.post('/register/initiate-otp', initiateVendorRegistrationOtp);
router.post('/register/verify-otp', verifyVendorEmailOtp);
router.post('/register/user', completeVendorUserRegistration);

router.post('/login', loginVendor);

// === Protected routes (auth required) ===
router.post('/register/profile', authMiddleware([UserRole.BUYER, UserRole.SELLER]), completeVendorProfileRegistration);

router.get('/', authMiddleware(UserRole.ADMIN), getAllVendors);
router.post('/vendor/convert', authMiddleware(), convertUserToVendor);
router.get('/:id', authMiddleware(), getVendorById);
router.put(
  '/profile/:vendorId',
  authMiddleware([UserRole.SELLER]),
  updateVendorProfile
);
// router.put('/:id', authMiddleware(UserRole.SELLER), updateVendor);
router.delete('/:id', authMiddleware(UserRole.ADMIN), deleteVendor);

router.post(
  '/:id/documents',
  authMiddleware(UserRole.SELLER),
  upload.array('documents'),
  uploadVendorDocuments
);

router.patch('/:id/approve', authMiddleware(UserRole.ADMIN), approveVendor);
router.patch('/:id/reject', authMiddleware(UserRole.ADMIN), rejectVendor);

router.get(
  '/:id/analytics',
  authMiddleware([UserRole.ADMIN, UserRole.SELLER]),
  getVendorAnalytics
);

export default router;
