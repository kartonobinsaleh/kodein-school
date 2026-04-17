export type UserRole = 'ADMIN' | 'MENTOR' | 'STUDENT';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface UserSearchParams {
  search?: string;
  page?: number;
  limit?: number;
}
