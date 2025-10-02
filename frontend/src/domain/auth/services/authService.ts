import { api } from '@/core/lib/api';
import type { LoginCredentials, LoginResponse } from '../types';

/**
 * @service authService
 * @summary Provides methods for authentication-related backend operations.
 * @domain auth
 * @type api-service
 * @category authentication
 */
export const authService = {
  /**
   * @method login
   * @summary Authenticates a user and returns a token and user data.
   * @param {LoginCredentials} credentials - The user's email and password.
   * @returns {Promise<LoginResponse>} The login response containing token and user info.
   */
  login: (credentials: LoginCredentials): Promise<LoginResponse> => {
    return api.post('/external/auth/login', credentials);
  },

  // In a real app, you would add register, forgotPassword, etc.
};
