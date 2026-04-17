import { Request, Response, NextFunction } from 'express';
import { gradeService } from './grade.service';
import { CreateGradeInput, UpdateGradeInput } from './grade.schema';

export const gradeController = {
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input = req.body as CreateGradeInput;
      const result = await gradeService.createGrade(input);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await gradeService.getAllGrades();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  search: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const search = req.query.search as string;
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      
      const result = await gradeService.searchGrades(search, page, limit);
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
      const result = await gradeService.getGradeById(id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const input = req.body as UpdateGradeInput;
      const result = await gradeService.updateGrade(id, input);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      await gradeService.deleteGrade(id);
      res.status(200).json({ success: true, message: 'Grade deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
