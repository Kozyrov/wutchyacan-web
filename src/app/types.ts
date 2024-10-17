export interface Task {
  id: string;
  label: string;
  order?: number;
  points: number;
  list: string;
  completed: boolean;
}

export interface List {
  id: string;
  name: string;
  members: string[];
}
export type ReduxLoadingStatus = 'idle' | 'loading' | 'failed';
