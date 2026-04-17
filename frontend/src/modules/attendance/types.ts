import type { AttendanceStatus } from '@/types/api';

export type { AttendanceStatus };

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  // NO courseId — field does not exist in Prisma Attendance model
  student?: { id: string; name: string };
  createdAt: string;
}

// POST /attendance
export interface CreateAttendancePayload {
  studentId: string;
  date: string;              // backend transforms string → Date
  status: AttendanceStatus;
  // NO courseId
}

// PATCH /attendance/:id
export interface UpdateAttendancePayload {
  status?: AttendanceStatus;
}
