import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useAuthStore } from '@/store/authStore';
import { Card, Button, Input } from '@/components/ui';

export default function LoginPage() {
  const { isAuthenticated } = useAuthStore();
  const { mutate: login, isPending, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen bg-primary dark:bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Decorative blobs using standard tailwind colors and radius */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-success opacity-20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-danger opacity-20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />

      <Card className="w-full max-w-md p-10 relative z-10 border-b-4 border-gray-200 dark:border-dark-border">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 hover:scale-105 transition-transform">
            <span className="text-white text-xl font-black">K</span>
          </div>
          <h1 className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight">KODEIN EDU</h1>
          <p className="text-sm text-gray-500 font-medium mt-2 italic">Ready to learn something new?</p>
        </div>

        {error && (
          <div className="bg-danger/10 border-2 border-danger/20 text-danger text-sm font-bold rounded-xl px-4 py-3 mb-6 animate-bounce">
            Oops! Email atau password salah.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="EMAIL"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@kodein.com"
          />

          <Input
            label="PASSWORD"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <Button
            type="submit"
            disabled={isPending}
            fullWidth
            variant="primary"
          >
            {isPending ? 'JOINING...' : 'LOGIN!'}
          </Button>
        </form>

        <div className="flex justify-between mt-8">
          <div className="h-4 w-4 rounded-xl bg-primary animate-pulse" />
          <div className="h-4 w-4 rounded-xl bg-danger animate-pulse delay-75" />
          <div className="h-4 w-4 rounded-xl bg-warning animate-pulse delay-150" />
          <div className="h-4 w-4 rounded-xl bg-success animate-pulse delay-300" />
        </div>
      </Card>
    </div>
  );
}
