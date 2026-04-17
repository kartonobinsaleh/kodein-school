import { z } from 'zod';

export const createStudentSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
  name: z.string({ required_error: 'Name is required' }).min(2, 'Name too short'),
  nis: z.string().optional(),
  nisn: z.string().optional(),
  classId: z.string().optional(),
});

export const updateStudentSchema = z.object({
  name: z.string().min(2, 'Name too short').optional(),
  nis: z.string().optional(),
  nisn: z.string().optional(),
  classId: z.string().optional(), // Can move student to a different class
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
