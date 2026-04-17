export interface Course {
  id: string;
  title: string;         // backend field is 'title', not 'name'
  subjectId: string;
  mentorId: string;
  subject?: { id: string; name: string };
  mentor?: { id: string; email: string };  // User has email, not name
  createdAt: string;
  updatedAt: string;
}

// POST /courses
export interface CreateCoursePayload {
  title: string;         // NOT 'name'
  subjectId: string;
  mentorId: string;      // required
}

// PATCH /courses/:id
export interface UpdateCoursePayload {
  title?: string;
  subjectId?: string;
  mentorId?: string;
}
