import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from '@shared/auth/src/index';

export const checkRole = (roles: AuthPayload['role'][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // ✅ TypeScript should now recognize user
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};
