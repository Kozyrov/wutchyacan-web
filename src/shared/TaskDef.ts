export interface Task {
  id: string;
  label: string;
  order?: number;
  points: number;
  completed: boolean;
  removed: boolean;
}
export type ReduxLoadingStatus = 'idle' | 'loading' | 'failed';
