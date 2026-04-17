import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { activityApi, type ActivityParams } from '../api';
import type { CreateActivityPayload, UpdateActivityPayload } from '../types';

const KEY = 'activities';
const SEARCH_KEY = 'activities-search';

export function useActivities() {
  return useQuery({ queryKey: [KEY], queryFn: activityApi.getAll });
}

export function useActivitySearch(params?: ActivityParams) {
  return useQuery({ 
    queryKey: [SEARCH_KEY, params], 
    queryFn: () => activityApi.search(params) 
  });
}

export function useActivity(id: string) {
  return useQuery({ queryKey: [KEY, id], queryFn: () => activityApi.getById(id), enabled: !!id });
}

export function useCreateActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateActivityPayload) => activityApi.create(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}

export function useUpdateActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateActivityPayload }) =>
      activityApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}

export function useDeleteActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => activityApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEY] });
      qc.invalidateQueries({ queryKey: [SEARCH_KEY] });
    },
  });
}
