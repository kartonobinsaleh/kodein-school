import type { ActivityType } from '@/types/api';

export type { ActivityType };

export interface Activity {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  type: ActivityType;
  // NO deadline — field does not exist in Prisma schema
  course?: { id: string; title: string };
  createdAt: string;
  updatedAt: string;
}

// POST /activities
export interface CreateActivityPayload {
  courseId: string;
  title: string;
  description?: string;
  type: ActivityType;
}

// PATCH /activities/:id
export interface UpdateActivityPayload {
  title?: string;
  description?: string;
  type?: ActivityType;
}
