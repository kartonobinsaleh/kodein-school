import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollmentApi } from '../api';
import type { CreateEnrollmentPayload } from '../types';

const KEY = 'enrollments';

export function useEnrollments() {
  return useQuery({ queryKey: [KEY], queryFn: enrollmentApi.getAll });
}

export function useCreateEnrollment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateEnrollmentPayload) => enrollmentApi.create(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

// No useUpdateEnrollment — enrollment is immutable per backend
export function useDeleteEnrollment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => enrollmentApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
