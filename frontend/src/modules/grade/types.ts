export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  finalScore: number;        // Prisma field is 'finalScore', NOT 'score'
  student?: { id: string; name: string };
  subject?: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

// POST /grades
export interface CreateGradePayload {
  studentId: string;
  subjectId: string;
  finalScore: number;        // NOT 'score'
}

// PATCH /grades/:id
export interface UpdateGradePayload {
  finalScore?: number;       // NOT 'score'
}
