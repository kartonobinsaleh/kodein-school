import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

/**
 * Usage: router.get('/path', authenticate, authorize('ADMIN', 'MENTOR'), controller)
 */
export const authorize = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    if (!roles.includes(req.user.role as Role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: requires one of [${roles.join(', ')}]`,
      });
      return;
    }

    next();
  };
};
