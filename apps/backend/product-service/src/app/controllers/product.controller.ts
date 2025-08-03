import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service';
import { sendSuccess } from '@shared/middlewares/utils/src/lib/response';
import { produceKafkaEvent } from '@shared/kafka';

/**
 * Helper to get userId or send 401 if missing
 */
function getUserIdOrThrow(req: Request, res: Response): string | undefined {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized: User not found' });
    return undefined;
  }
  return req.user.userId;
}

/**
 * 📦 Create a new product
 */
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getUserIdOrThrow(req, res);
    if (!userId) return;

    const product = await productService.createProduct(req.body, userId);
    await produceKafkaEvent({
      topic: 'product.created',
      messages: [{ value: JSON.stringify(product) }],
    });
    sendSuccess(res, '✅ Product created successfully', product);
  } catch (err) {
    next(err);
  }
};

/**
 * 🔍 Get all products
 */
export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getAllProducts();
    sendSuccess(res, '✅ Product list fetched', products);
  } catch (err) {
    next(err);
  }
};

/**
 * 🔍 Get a product by ID
 */
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.getProductById(req.params.id);
    sendSuccess(res, '✅ Product details retrieved', product);
  } catch (err) {
    next(err);
  }
};

/**
 * 🛠️ Update product details
 */
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getUserIdOrThrow(req, res);
    if (!userId) return;

    const updated = await productService.updateProduct(req.params.id, req.body, userId);
    await produceKafkaEvent({
      topic: 'product.updated',
      messages: [{ value: JSON.stringify(updated) }],
    });
    sendSuccess(res, '✅ Product updated successfully', updated);
  } catch (err) {
    next(err);
  }
};

/**
 * ❌ Delete a product
 */
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = getUserIdOrThrow(req, res);
    if (!userId) return;

    const deleted = await productService.deleteProduct(req.params.id, userId);
    await produceKafkaEvent({
      topic: 'product.deleted',
      messages: [{ value: JSON.stringify({ productId: req.params.id }) }],
    });
    sendSuccess(res, '🗑️ Product deleted', deleted);
  } catch (err) {
    next(err);
  }
};

/**
 * 🖼️ Upload product image to MinIO
 */
export const uploadProductImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // This operation might not require userId, but if it does, add similar check
    const result = await productService.uploadProductImage(req.params.id, req.body.imageBase64);
    sendSuccess(res, '🖼️ Image uploaded to MinIO', result);
  } catch (err) {
    next(err);
  }
};
