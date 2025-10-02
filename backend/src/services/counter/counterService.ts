import { CounterStatus, CounterState } from './counterTypes';

// In-memory storage for counters (in a real app, this would be a database)
const counters = new Map<number, CounterState>();

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
    return {
      currentValue: 1,
      status: CounterStatus.PAUSED,
      isCompleted: false,
    };
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
  }

  return counter;
}
