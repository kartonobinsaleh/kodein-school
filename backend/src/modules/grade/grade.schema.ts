import { z } from 'zod';

export const createGradeSchema = z.object({
  studentId: z.string({ required_error: 'Student ID is required' }),
  subjectId: z.string({ required_error: 'Subject ID is required' }),
  finalScore: z.number({ required_error: 'Final score is required' }).min(0).max(100),
});

export const updateGradeSchema = z.object({
  finalScore: z.number().min(0).max(100).optional(),
});

export type CreateGradeInput = z.infer<typeof createGradeSchema>;
export type UpdateGradeInput = z.infer<typeof updateGradeSchema>;
