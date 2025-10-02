import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
