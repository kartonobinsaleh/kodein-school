export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  student?: { id: string; name: string };
  course?: { id: string; title: string };
  createdAt: string;
}

// POST /enrollments
export interface CreateEnrollmentPayload {
  studentId: string;
  courseId: string;
}

// No update — enrollment is immutable (backend has no PATCH route)
