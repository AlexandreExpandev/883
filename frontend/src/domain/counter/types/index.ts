export interface CounterState {
  value: number;
  status: 'running' | 'paused' | 'finished';
  is_final_count?: boolean;
}
