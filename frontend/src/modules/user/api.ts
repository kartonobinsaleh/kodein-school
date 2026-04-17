import api from '@/services/api';
import { User, UserSearchParams } from './types';

export const userApi = {
  search: (params: UserSearchParams) => 
    api.get('/users/search', { params }).then(res => res.data),
    
  updateRole: (id: string, role: string) => 
    api.patch(`/users/${id}/role`, { role }).then(res => res.data),
    
  delete: (id: string) => 
    api.delete(`/users/${id}`).then(res => res.data),
};
