import { z } from 'zod';
import { AttendanceStatus } from '@prisma/client';

export const createAttendanceSchema = z.object({
  studentId: z.string({ required_error: 'Student ID is required' }),
  date: z.string().transform((str) => new Date(str)), // Casts incoming string to Date
  status: z.nativeEnum(AttendanceStatus, { required_error: 'Invalid attendance status' }),
});

export const updateAttendanceSchema = z.object({
  status: z.nativeEnum(AttendanceStatus).optional(),
});

export type CreateAttendanceInput = z.infer<typeof createAttendanceSchema>;
export type UpdateAttendanceInput = z.infer<typeof updateAttendanceSchema>;
