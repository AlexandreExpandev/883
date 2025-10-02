/**
 * @module counter
 * @summary Manages the state and interactions for the counting feature.
 * @domain functional
 * @dependencies @tanstack/react-query, @/core/lib/api
 * @version 1.0.0
 */

// Domain public exports - Services
export * from './services/counterService';

// Domain public exports - Types
export * from './types';

// Domain public exports - Hooks
export * from './hooks/useCounter';

// Module metadata
export const moduleMetadata = {
  name: 'counter',
  domain: 'functional',
  version: '1.0.0',
  publicServices: ['counterService'],
  publicHooks: ['useCounter'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/contexts/auth'],
    external: ['@tanstack/react-query'],
    domains: ['@/domain/auth'],
  },
  exports: {
    services: ['counterService'],
    hooks: ['useCounter'],
    types: ['CounterState'],
  },
} as const;
