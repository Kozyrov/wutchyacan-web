export interface Task {
  id: string;
  label: string;
  order?: number;
  points: number;
  completed: boolean;
}

export interface List {
  id: string;
  name: string;
  members: string[];
}
export type ReduxLoadingStatus = 'idle' | 'loading' | 'failed';
