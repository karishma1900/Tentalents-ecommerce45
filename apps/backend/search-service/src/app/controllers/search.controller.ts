import { Request, Response, NextFunction } from 'express';
import { searchService } from '../services/search.service';
import { sendSuccess } from '@shared/middlewares/utils/src/lib/response';

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query, category, brand } = req.query;

    const products = await searchService.search({
      query: typeof query === 'string' ? query : undefined,
      category: typeof category === 'string' ? category : undefined,
      brand: typeof brand === 'string' ? brand : undefined,
    });

    sendSuccess(res, 'Search results', products);
  } catch (err) {
    next(err);
  }
};