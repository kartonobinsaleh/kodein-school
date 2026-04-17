import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseApi, type CourseParams } from '../api';
import type { CreateCoursePayload, UpdateCoursePayload } from '../types';

const KEY = 'courses';
const SEARCH_KEY = 'courses-search';

export function useCourses() {
  return useQuery({ queryKey: [KEY], queryFn: courseApi.getAll });
}

export function useCourseSearch(params?: CourseParams) {
  return useQuery({ 
    queryKey: [SEARCH_KEY, params], 
    queryFn: () => courseApi.search(params) 
  });
}

export function useCourse(id: string) {
  return useQuery({ queryKey: [KEY, id], queryFn: () => courseApi.getById(id), enabled: !!id });
}

export function useCreateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateCoursePayload) => courseApi.create(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}

export function useUpdateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCoursePayload }) =>
      courseApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}

export function useDeleteCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => courseApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}
