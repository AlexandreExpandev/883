/**
 * @module auth
 * @summary Handles user authentication, registration, and session management.
 * @domain security
 * @dependencies axios, zod, @/core/lib/api
 * @version 1.0.0
 */

// Domain public exports - Services
export * from './services/authService';

// Domain public exports - Types
export * from './types';

// Domain public exports - Hooks
export * from './hooks/useAuthFlow';

// Module metadata
export const moduleMetadata = {
  name: 'auth',
  domain: 'security',
  version: '1.0.0',
  publicServices: ['authService'],
  publicHooks: ['useAuthFlow'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/contexts/auth'],
    external: ['axios', 'zod'],
    domains: [],
  },
  exports: {
    services: ['authService'],
    hooks: ['useAuthFlow'],
    types: ['LoginCredentials', 'LoginResponse', 'User'],
  },
} as const;
