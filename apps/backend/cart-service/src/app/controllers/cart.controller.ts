import { Request, Response, NextFunction } from 'express';
import { cartService } from '../services/cart.service';
import { sendSuccess } from '@shared/utils';
import type { AuthPayload } from '@shared/auth';
import { logger } from '@shared/logger';
interface AuthedRequest extends Request {
  user?: AuthPayload;
}

const extractUserId = (req: AuthedRequest): string | null => {
  return (
    req.user?.userId ||
    req.query.sessionId?.toString() ||
    req.body.sessionId ||
    null
  );
};

/**
 * GET /api/cart
 * Fetch the current cart for an authenticated user or guest
 */
export const getCart = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res
        .status(400)
        .json({ message: '❌ Missing userId or sessionId' });
    }

    const cart = await cartService.getCart(userId);
    return sendSuccess(res, '🛒 Cart fetched successfully', cart);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/cart
 * Add an item to the user's or guest's cart
 */
export const addToCart = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = extractUserId(req);

    logger.info('[CartController] 🧾 Incoming add-to-cart request', {
      userId,
      body: req.body,
    });

    if (!userId) {
      logger.warn('[CartController] ❌ Missing userId or sessionId');
      return res
        .status(400)
        .json({ message: '❌ Missing userId or sessionId' });
    }

    const cart = await cartService.addToCart(userId, req.body.item); // Make sure this is `req.body.item`

    logger.info('[CartController] ✅ Item added successfully', { cart });

    return sendSuccess(res, '✅ Item added to cart', cart);
  } catch (err) {
    logger.error('[CartController] ❌ Failed to add item to cart', err);
    next(err);
  }
};
/**
 * POST /api/cart/checkout
 * Checkout the user's or guest's cart
 */
export const checkoutCart = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res
        .status(400)
        .json({ message: '❌ Missing userId or sessionId' });
    }

    const result = await cartService.checkout(userId);
    return sendSuccess(res, '✅ Cart checked out successfully', result);
  } catch (err) {
    next(err);
  }
};
export const updateCartItemQuantity = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(400).json({ message: '❌ Missing userId or sessionId' });
    }

    const { listingId, quantityChange } = req.body;
    const updatedCart = await cartService.updateCartItemQuantity(userId, listingId, quantityChange);

    return sendSuccess(res, '✅ Cart item quantity updated', updatedCart);
  } catch (err) {
    next(err);
  }
};
