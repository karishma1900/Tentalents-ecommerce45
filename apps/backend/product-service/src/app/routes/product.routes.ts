import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getProductsForCard,
  getProductBySlug
} from '../controllers/product.controller';
import { authMiddleware, requireRole } from '@shared/auth';

const router = Router();

// 🛒 Create product (admin/seller)
router.post(
  '/',
  authMiddleware(['seller', 'admin', 'super_admin']),
  createProduct
);

// 📦 Get all products (public)
router.get('/', getAllProducts);
router.get('/cards', getProductsForCard);

// 🔍 Get product by ID (public)
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

// 📝 Update product (admin/seller)
router.put (
  '/:id',
  authMiddleware(),
  requireRole('seller', 'admin', 'super_admin'),
 updateProduct
);

// ❌ Delete product (admin/seller)
router.delete(
  '/:id',
  authMiddleware(),
  requireRole('seller', 'admin', 'super_admin'),
 deleteProduct
);

// 🖼️ Upload product image to MinIO
router.post(
  '/:id/image',
  authMiddleware(),
  requireRole('seller', 'admin', 'super_admin'),
 uploadProductImage
);

export default router;
