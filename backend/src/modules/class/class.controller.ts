import { Request, Response, NextFunction } from 'express';
import { classService } from './class.service';
import { CreateClassInput, UpdateClassInput } from './class.schema';

export const classController = {
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input = req.body as CreateClassInput;
      const result = await classService.createClass(input);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const search = req.query.search as string;
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      
      const result = await classService.getAllClasses(search, page, limit);
      res.status(200).json({ 
        success: true, 
        data: result.data, 
        meta: result.meta 
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const result = await classService.getClassById(id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const input = req.body as UpdateClassInput;
      const result = await classService.updateClass(id, input);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      await classService.deleteClass(id);
      res.status(200).json({ success: true, message: 'Class deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
