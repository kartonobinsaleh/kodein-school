import api from '@/services/api';
import { User, UserSearchParams } from './types';

export const userApi = {
  create: (data: any) => 
    api.post('/users', data).then(res => res.data),

  search: (params: UserSearchParams) => 
    api.get('/users/search', { params }).then(res => res.data),
    
  update: (id: string, data: any) => 
    api.patch(`/users/${id}`, data).then(res => res.data),
    
  delete: (id: string) => 
    api.delete(`/users/${id}`).then(res => res.data),
};
