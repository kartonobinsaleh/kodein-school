import { z } from 'zod';
import { ActivityType } from '@prisma/client';

export const createActivitySchema = z.object({
  courseId: z.string({ required_error: 'Course ID is required' }),
  title: z.string({ required_error: 'Title is required' }).min(3, 'Title too short'),
  description: z.string().optional(),
  type: z.nativeEnum(ActivityType, { required_error: 'Invalid activity type' }),
});

export const updateActivitySchema = z.object({
  title: z.string().min(3, 'Title too short').optional(),
  description: z.string().optional(),
  type: z.nativeEnum(ActivityType).optional(),
});

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;
