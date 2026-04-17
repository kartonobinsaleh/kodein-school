import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';

export const userController = {
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await userService.createUser(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

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

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const result = await userService.updateUser(id, req.body);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const currentUserId = (req as any).user.id;
      await userService.deleteUser(id, currentUserId);
      res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
      next(error);
    }
  },
};
