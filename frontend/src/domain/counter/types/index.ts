export interface CounterState {
  current_count_value: number;
  status: string;
  is_final_count: boolean;
  value?: number; // For compatibility with existing code
}
