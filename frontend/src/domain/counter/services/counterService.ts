import { api } from '@/core/lib/api';
import type { CounterState } from '../types';

/**
 * @service counterService
 * @summary Provides methods for counter-related backend operations.
 * @domain counter
 * @type api-service
 * @category functional
 */
export const counterService = {
  /**
   * @method getCurrent
   * @summary Fetches the current state of the counter.
   * @returns {Promise<CounterState>} The current counter state.
   */
  getCurrent: (): Promise<CounterState> => api.get('/internal/counter/current'),

  /**
   * @method start
   * @summary Starts or resumes the counter.
   * @returns {Promise<CounterState>} The updated counter state.
   */
  start: (): Promise<CounterState> => api.post('/internal/counter/start'),

  /**
   * @method pause
   * @summary Pauses the counter.
   * @returns {Promise<CounterState>} The updated counter state.
   */
  pause: (): Promise<CounterState> => api.post('/internal/counter/pause'),

  /**
   * @method reset
   * @summary Resets the counter to its initial state.
   * @returns {Promise<CounterState>} The updated counter state.
   */
  reset: (): Promise<CounterState> => api.post('/internal/counter/reset'),
};
