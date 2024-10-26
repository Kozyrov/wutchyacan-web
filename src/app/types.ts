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
  removed: string[];
  completed: string[];
}

export interface Option {
  id: string;
  label: string;
}
export type ReduxLoadingStatus = 'idle' | 'loading' | 'failed';
export type TaskStatusLists = 'members' | 'removed' | 'completed';
