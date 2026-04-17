import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';

export const userController = {
  search: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const search = req.query.search as string;
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      
      const result = await userService.searchUsers(search, page, limit);
      res.status(200).json({ 
        success: true, 
        data: result.data, 
        meta: result.meta 
      });
    } catch (error) {
      next(error);
    }
  },

  updateRole: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const result = await userService.updateUserRole(id, role);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const currentUserId = (req as any).user.id;
      await userService.deleteUser(id, currentUserId);
      res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
      next(error);
    }
  },
};
