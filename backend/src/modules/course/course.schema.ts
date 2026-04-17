import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).min(3, 'Title too short'),
  subjectId: z.string({ required_error: 'Subject ID is required' }),
  mentorId: z.string({ required_error: 'Mentor ID is required' }),
});

export const updateCourseSchema = z.object({
  title: z.string().min(3, 'Title too short').optional(),
  subjectId: z.string().optional(),
  mentorId: z.string().optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
