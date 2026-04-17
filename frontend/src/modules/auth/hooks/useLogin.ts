import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useAuthStore } from '@/store/authStore';
import type { LoginRequest } from '../types';

export function useLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: ({ token, user }) => {
      localStorage.setItem('token', token);
      setAuth(token, user);
      navigate('/dashboard');
    },
  });
}
