import { Request, Response, NextFunction } from 'express';
export declare const createRating: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getRatingsByProduct: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateRating: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteRating: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
