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
  isFinalCount?: boolean; // Flag to indicate if the counter has reached its final value (10)
}

/**
 * @summary
 * Interface representing the formatted counter state for client display
 */
export interface CounterDisplay {
  current_count_value: number;
  status: string;
  is_final_count: boolean;
}
