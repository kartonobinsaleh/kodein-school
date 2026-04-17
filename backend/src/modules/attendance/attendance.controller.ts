import { Request, Response, NextFunction } from 'express';
import { attendanceService } from './attendance.service';
import { CreateAttendanceInput, UpdateAttendanceInput } from './attendance.schema';

export const attendanceController = {
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const input = req.body as CreateAttendanceInput;
      const result = await attendanceService.createAttendance(input);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      
      const result = await attendanceService.getAllAttendance(page, limit);
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
      const result = await attendanceService.getAttendanceById(id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      const input = req.body as UpdateAttendanceInput;
      const result = await attendanceService.updateAttendance(id, input);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string;
      await attendanceService.deleteAttendance(id);
      res.status(200).json({ success: true, message: 'Attendance record deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
