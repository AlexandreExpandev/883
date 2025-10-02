import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/core/contexts/auth';
import { queryClient } from '@/core/lib/queryClient';

/**
 * @component AppProviders
 * @summary A component that wraps the entire application with necessary context providers.
 * @domain core
 * @type ui-component
 * @category layout
 */
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
