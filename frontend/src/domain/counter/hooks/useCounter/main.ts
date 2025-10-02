import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { counterService } from '../../services/counterService';
import { useAuth } from '@/core/contexts/auth';

const COUNTER_QUERY_KEY = ['counter'];

/**
 * @hook useCounter
 * @summary Manages the counter state and actions by interacting with the counter service.
 * @domain counter
 * @type domain-hook
 * @category data
 */
export const useCounter = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const {
    data: counterState,
    isLoading,
    error,
  } = useQuery({
    queryKey: COUNTER_QUERY_KEY,
    queryFn: counterService.getCurrent,
    enabled: isAuthenticated, // Only fetch if the user is authenticated
  });

  const mutationOptions = {
    onSuccess: (data: any) => {
      queryClient.setQueryData(COUNTER_QUERY_KEY, data);
    },
    onError: (error: any) => {
      console.error('Counter mutation failed:', error);
      // Optionally, show a toast notification to the user
    },
  };

  const startMutation = useMutation({
    mutationFn: counterService.start,
    ...mutationOptions,
  });

  const pauseMutation = useMutation({
    mutationFn: counterService.pause,
    ...mutationOptions,
  });

  const resetMutation = useMutation({
    mutationFn: counterService.reset,
    ...mutationOptions,
  });

  return {
    value: counterState?.value ?? 0,
    status: counterState?.status ?? 'paused',
    isLoading,
    error,
    start: () => startMutation.mutate(),
    pause: () => pauseMutation.mutate(),
    reset: () => resetMutation.mutate(),
    isMutating: startMutation.isPending || pauseMutation.isPending || resetMutation.isPending,
  };
};
