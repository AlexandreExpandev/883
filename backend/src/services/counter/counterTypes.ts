/**
 * @summary
 * Enum representing the possible states of a counter
 */
export enum CounterStatus {
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
}

/**
 * @summary
 * Interface representing the state of a counter
 */
export interface CounterState {
  currentValue: number;
  status: CounterStatus;
  isCompleted: boolean;
}
