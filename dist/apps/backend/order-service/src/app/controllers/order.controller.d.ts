import { Request, Response, NextFunction } from 'express';
import type { AuthPayload } from '@shared/auth/lib/types';
interface AuthedRequest extends Request {
    user?: AuthPayload;
}
export declare const placeOrder: (req: AuthedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserOrders: (req: AuthedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getOrderById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateOrderStatus: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
