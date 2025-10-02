export type CounterStatus = 'parado' | 'em_andamento' | 'pausado' | 'finalizado';

export interface CounterState {
  value: number;
  status: CounterStatus;
  is_final_count?: boolean;
}
