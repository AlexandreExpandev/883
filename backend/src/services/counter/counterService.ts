import { CounterStatus, CounterState, CounterDisplay } from './counterTypes';
import { socketService } from '../../instances/socket';

// In-memory storage for counters (in a real app, this would be a database)
const counters = new Map<number, CounterState>();

/**
 * @summary
 * Formats the counter state for client display
 *
 * @param state - Counter state
 * @returns Formatted counter display
 */
export function formatCounterForDisplay(state: CounterState): CounterDisplay {
  return {
    current_count_value: state.currentValue,
    status: state.status.toLowerCase(),
    is_final_count: state.isCompleted && state.currentValue === 10,
  };
}

/**
 * @summary
 * Starts the counter for a user
 *
 * @param userId - User identifier
 * @returns Counter state
 */
export async function startCounter(userId: number): Promise<CounterState> {
  let counter = counters.get(userId);

  if (!counter) {
    // Initialize counter if it doesn't exist
    counter = {
      currentValue: 1,
      status: CounterStatus.RUNNING,
      isCompleted: false,
    };
  } else {
    // Update existing counter
    counter.status = CounterStatus.RUNNING;

    // If counter was completed, reset it
    if (counter.isCompleted) {
      counter.currentValue = 1;
      counter.isCompleted = false;
    }
  }

  counters.set(userId, counter);

  // Notify clients about the counter update
  socketService.emitCounterUpdate(userId, formatCounterForDisplay(counter));

  return counter;
}

/**
 * @summary
 * Pauses the counter for a user
 *
 * @param userId - User identifier
 * @returns Counter state
 */
export async function pauseCounter(userId: number): Promise<CounterState> {
  let counter = counters.get(userId);

  if (!counter) {
    throw new Error('Counter not started');
  }

  counter.status = CounterStatus.PAUSED;
  counters.set(userId, counter);

  // Notify clients about the counter update
  socketService.emitCounterUpdate(userId, formatCounterForDisplay(counter));

  return counter;
}

/**
 * @summary
 * Resets the counter for a user
 *
 * @param userId - User identifier
 * @returns Counter state
 */
export async function resetCounter(userId: number): Promise<CounterState> {
  const counter = {
    currentValue: 1,
    status: CounterStatus.PAUSED,
    isCompleted: false,
  };

  counters.set(userId, counter);

  // Notify clients about the counter update
  socketService.emitCounterUpdate(userId, formatCounterForDisplay(counter));

  return counter;
}

/**
 * @summary
 * Gets the current counter state for a user
 *
 * @param userId - User identifier
 * @returns Counter state
 */
export async function getCurrentCounter(userId: number): Promise<CounterState> {
  const counter = counters.get(userId);

  if (!counter) {
    // Return default state if counter doesn't exist
    const defaultState = {
      currentValue: 1,
      status: CounterStatus.PAUSED,
      isCompleted: false,
    };
    return defaultState;
  }

  // If counter is running, increment it
  if (counter.status === CounterStatus.RUNNING && !counter.isCompleted) {
    counter.currentValue++;

    // Check if counter reached 10
    if (counter.currentValue > 10) {
      counter.currentValue = 10;
      counter.isCompleted = true;
      counter.status = CounterStatus.PAUSED;
    }

    counters.set(userId, counter);

    // Notify clients about the counter update
    socketService.emitCounterUpdate(userId, formatCounterForDisplay(counter));
  }

  return counter;
}
