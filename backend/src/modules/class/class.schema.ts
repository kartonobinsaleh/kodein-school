import { z } from 'zod';

export const createClassSchema = z.object({
  name: z.string({ required_error: 'Class name is required' }).min(2, 'Name too short'),
  level: z.string({ required_error: 'Class level is required' }).min(1, 'Level is required'),
});

export const updateClassSchema = z.object({
  name: z.string().min(2, 'Name too short').optional(),
  level: z.string().min(1, 'Level is required').optional(),
});

export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
