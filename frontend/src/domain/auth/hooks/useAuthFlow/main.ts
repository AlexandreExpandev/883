import { useAuth } from '@/core/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoginCredentials } from '../../types';

/**
 * @hook useAuthFlow
 * @summary Manages the user authentication flow, including login, logout, and redirection.
 * @domain auth
 * @type domain-hook
 * @category authentication
 */
export const useAuthFlow = () => {
  const { login, logout, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(credentials);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return {
    user,
    isLoading,
    error,
    handleLogin,
    handleLogout,
  };
};
