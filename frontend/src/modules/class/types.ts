export interface Class {
  id: string;
  name: string;
  level: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClassPayload {
  name: string;
  level: string;
}

export interface UpdateClassPayload {
  name?: string;
  level?: string;
}
