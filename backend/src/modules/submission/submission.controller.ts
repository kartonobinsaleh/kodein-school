import { Request, Response, NextFunction } from 'express';
import { submissionService } from './submission.service';
import { CreateSubmissionInput, UpdateSubmissionInput } from './submission.schema';

export const submissionController = {
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input = req.body as CreateSubmissionInput;
      const result = await submissionService.createSubmission(input);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await submissionService.getAllSubmissions();
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
      
      const result = await submissionService.searchSubmissions(search, page, limit);
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
      const result = await submissionService.getSubmissionById(id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const input = req.body as UpdateSubmissionInput;
      const result = await submissionService.updateSubmission(id, input);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      await submissionService.deleteSubmission(id);
      res.status(200).json({ success: true, message: 'Submission deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
