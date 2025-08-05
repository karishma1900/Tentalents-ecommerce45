import { Request, Response, NextFunction } from 'express';
import { ratingService } from '../services/rating.service';
import { sendSuccess } from '@shared/middlewares/utils/src/lib/response';

export const createRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { productId, sellerId, score, comment } = req.body;

    if ((!productId && !sellerId) || typeof score !== 'number') {
      return res
        .status(400)
        .json({ message: 'Missing or invalid rating data' });
    }

    const created = await ratingService.createRating(req.user.userId, {
      productId,
      sellerId,
      score,
      comment,
    });

    sendSuccess(res, 'Rating submitted', created);
  } catch (err) {
    next(err);
  }
};

export const getRatingsByProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const ratings = await ratingService.getRatingsByProduct(productId);
    sendSuccess(res, 'Ratings fetched', ratings);
  } catch (err) {
    next(err);
  }
};

export const getRatingsBySeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sellerId } = req.params;
    const ratings = await ratingService.getRatingsBySeller(sellerId);
    sendSuccess(res, 'Ratings fetched', ratings);
  } catch (err) {
    next(err);
  }
};

export const updateRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const ratingId = req.params.id;
    const { score, comment } = req.body;

    if (typeof score !== 'number') {
      return res.status(400).json({ message: 'Invalid score value' });
    }

    const updated = await ratingService.updateRating(
      req.user.userId,
      ratingId,
      score,
      comment
    );

    sendSuccess(res, 'Rating updated', updated);
  } catch (err) {
    next(err);
  }
};

export const deleteRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const ratingId = req.params.id;
    await ratingService.deleteRating(req.user.userId, ratingId);
    sendSuccess(res, 'Rating deleted', null);
  } catch (err) {
    next(err);
  }
};
