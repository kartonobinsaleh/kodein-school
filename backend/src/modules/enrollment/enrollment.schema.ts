import { z } from 'zod';

export const createEnrollmentSchema = z.object({
  studentId: z.string({ required_error: 'Student ID is required' }),
  courseId: z.string({ required_error: 'Course ID is required' }),
});

export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;
