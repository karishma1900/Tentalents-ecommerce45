import { Request, Response, NextFunction } from 'express';
export declare const createCoupon: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllCoupons: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getCouponByCode: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deactivateCoupon: (req: Request, res: Response, next: NextFunction) => Promise<void>;
