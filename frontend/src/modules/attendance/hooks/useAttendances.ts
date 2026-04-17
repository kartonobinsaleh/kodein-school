import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceApi } from '../api';
import type { CreateAttendancePayload, UpdateAttendancePayload } from '../types';

const KEY = 'attendance';

export function useAttendances() {
  return useQuery({ queryKey: [KEY], queryFn: attendanceApi.getAll });
}

export function useAttendance(id: string) {
  return useQuery({ queryKey: [KEY, id], queryFn: () => attendanceApi.getById(id), enabled: !!id });
}

export function useCreateAttendance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateAttendancePayload) => attendanceApi.create(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateAttendance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAttendancePayload }) =>
      attendanceApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteAttendance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => attendanceApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
