import type { LoginCredentials } from '@/domain/auth/types';

export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export type { LoginCredentials };
