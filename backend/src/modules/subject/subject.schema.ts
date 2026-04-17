import { z } from 'zod';

export const createSubjectSchema = z.object({
  name: z.string({ required_error: 'Subject name is required' }).min(2, 'Name too short'),
});

export const updateSubjectSchema = z.object({
  name: z.string().min(2, 'Name too short').optional(),
});

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;
export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>;
