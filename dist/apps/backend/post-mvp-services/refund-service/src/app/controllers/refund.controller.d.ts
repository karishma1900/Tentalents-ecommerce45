import { Request, Response, NextFunction } from 'express';
export declare const requestRefund: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getRefundById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateRefundStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const listRefundsByUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
