import { Request, Response, NextFunction } from 'express';
import { enrollmentService } from './enrollment.service';
import { CreateEnrollmentInput } from './enrollment.schema';

export const enrollmentController = {
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input = req.body as CreateEnrollmentInput;
      const result = await enrollmentService.createEnrollment(input);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await enrollmentService.getAllEnrollments();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const result = await enrollmentService.getEnrollmentById(id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      await enrollmentService.deleteEnrollment(id);
      res.status(200).json({ success: true, message: 'Enrollment deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
