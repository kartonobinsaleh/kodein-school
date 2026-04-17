export interface Submission {
  id: string;
  activityId: string;
  studentId: string;
  content: string | null;
  url: string | null;
  score: number | null;      // set by mentor; Prisma: Float?
  feedback: string | null;   // set by mentor
  activity?: { id: string; title: string };
  student?: { id: string; name: string };
  submittedAt: string;       // Prisma field name is submittedAt, not createdAt
  updatedAt: string;
}

// POST /submissions
export interface CreateSubmissionPayload {
  activityId: string;
  studentId: string;
  content?: string;
  url?: string;
}

// PATCH /submissions/:id — used by mentor to grade
export interface UpdateSubmissionPayload {
  content?: string;
  url?: string;
  score?: number;
  feedback?: string;
}
