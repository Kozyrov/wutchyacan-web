export interface Task {
  id: string;
  label: string;
  order?: number;
  points: number;
  completed: boolean;
  removed: boolean;
}

export interface List {
  id: string;
  name: string;
}
export type ReduxLoadingStatus = 'idle' | 'loading' | 'failed';
