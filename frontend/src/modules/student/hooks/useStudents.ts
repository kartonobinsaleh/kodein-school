import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi, type StudentParams } from '../api';
import type { CreateStudentPayload, UpdateStudentPayload } from '../types';

const KEY = 'students';
const SEARCH_KEY = 'students-search';

export function useStudents() {
  return useQuery({ 
    queryKey: [KEY], 
    queryFn: studentApi.getAll 
  });
}

export function useStudentSearch(params?: StudentParams) {
  return useQuery({ 
    queryKey: [SEARCH_KEY, params], 
    queryFn: () => studentApi.search(params)
  });
}

export function useStudent(id: string) {
  return useQuery({ queryKey: [KEY, id], queryFn: () => studentApi.getById(id), enabled: !!id });
}

export function useCreateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateStudentPayload) => studentApi.create(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}

export function useUpdateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateStudentPayload }) =>
      studentApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}

export function useDeleteStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => studentApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}
