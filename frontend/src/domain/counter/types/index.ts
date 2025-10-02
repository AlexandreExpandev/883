export interface CounterState {
  value: number;
  status: 'running' | 'paused' | 'finished';
}
