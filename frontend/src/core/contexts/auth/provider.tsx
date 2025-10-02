import { useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthContext } from './context';
import { authService } from '@/domain/auth/services/authService';
import type { User, AuthContextValue, LoginCredentials } from './types';
import { api } from '@/core/lib/api';

/**
 * @component AuthProvider
 * @summary Provides authentication context to the application.
 * @domain core
 * @type context-provider
 * @category authentication
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initializeAuth = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // In a real app, you'd validate the token with the backend here.
      // For this example, we'll decode it to get user info.
      try {
        // This is a simplified user object. A real app would fetch from an endpoint.
        const decodedUser = { id: 1, email: 'user@example.com' }; // Placeholder
        setUser(decodedUser);
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (credentials: LoginCredentials) => {
    const { token, user } = await authService.login(credentials);
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
