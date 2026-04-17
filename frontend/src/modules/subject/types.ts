export interface Subject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubjectPayload {
  name: string;
}

export interface UpdateSubjectPayload {
  name?: string;
}
