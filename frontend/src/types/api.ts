// Shared API response shapes — single source of truth
export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiSingleResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiMessageResponse {
  success: boolean;
  message: string;
}

// Shared enums mirroring backend Prisma exactly
export type Role = 'ADMIN' | 'MENTOR' | 'STUDENT';
export type ActivityType = 'ASSIGNMENT' | 'PROJECT' | 'QUIZ';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'PERMIT';
