export interface Student {
  id: string;
  userId: string;
  classId: string | null;
  name: string;
  nis: string | null;
  nisn: string | null;
  class?: { id: string; name: string; level: string };
  createdAt: string;
  updatedAt: string;
}

// POST /students — creates User + Student in one call
export interface CreateStudentPayload {
  email: string;      // required — creates User account
  password: string;   // required — hashed by backend
  name: string;
  nis?: string;
  nisn?: string;
  classId?: string;
}

// PATCH /students/:id
export interface UpdateStudentPayload {
  name?: string;
  nis?: string;
  nisn?: string;
  classId?: string;
}
