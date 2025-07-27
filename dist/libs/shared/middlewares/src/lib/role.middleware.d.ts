import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from '@shared/auth';
export declare const checkRole: (roles: AuthPayload["role"][]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
