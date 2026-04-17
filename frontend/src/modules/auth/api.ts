import api from '@/services/api';
import type { ApiSingleResponse } from '@/types/api';
import type { LoginRequest, LoginResponse } from './types';

export const authApi = {
  login: (payload: LoginRequest) =>
    api.post<ApiSingleResponse<LoginResponse>>('/auth/login', payload).then((r) => r.data.data),
};
