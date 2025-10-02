import { CounterStatus, CounterState, CounterDisplay } from './counterTypes';
import { socketService } from '../../instances/socket';

// In-memory storage for counters (in a real app, this would be a database)
const counters = new Map<number, CounterState>();

// In-memory storage for counter timers
const counterTimers = new Map<number, NodeJS.Timeout>();

// Default interval between count increments (in milliseconds)
const DEFAULT_COUNT_INTERVAL = 1000;

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
 * Increments the counter value for a user and emits the update
 *
 * @param userId - User identifier
 */
function incrementCounter(userId: number): void {
  const counter = counters.get(userId);

  if (!counter || counter.status !== CounterStatus.RUNNING || counter.isCompleted) {
    // Stop the timer if the counter is not running or is completed
    clearCounterTimer(userId);
    return;
  }

  // Increment the counter
  counter.currentValue++;

  // Check if counter reached 10
  if (counter.currentValue >= 10) {
    counter.currentValue = 10;
    counter.isCompleted = true;
    counter.status = CounterStatus.PAUSED;
    clearCounterTimer(userId);
  }

  counters.set(userId, counter);

  // Notify clients about the counter update
  socketService.emitCounterUpdate(userId, formatCounterForDisplay(counter));
}

/**
 * @summary
 * Clears the counter timer for a user
 *
 * @param userId - User identifier
 */
function clearCounterTimer(userId: number): void {
  const timer = counterTimers.get(userId);
  if (timer) {
    clearInterval(timer);
    counterTimers.delete(userId);
  }
}

/**
 * @summary
 * Starts the counter for a user
 *
 * @param userId - User identifier
 * @returns Counter state
 */
export async function startCounter(userId: number): Promise<CounterState> {
  // Clear any existing timer
  clearCounterTimer(userId);

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

  // Start a new timer to increment the counter at regular intervals
  const timer = setInterval(() => incrementCounter(userId), DEFAULT_COUNT_INTERVAL);
  counterTimers.set(userId, timer);

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

  // Clear the timer
  clearCounterTimer(userId);

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
  // Clear the timer
  clearCounterTimer(userId);

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

  return counter;
}
