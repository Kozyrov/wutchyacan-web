export interface Task {
  id: string;
  name: string;
  order?: number;
  points: number;
  list: string;
  completed: boolean;
}

export interface List {
  id: string;
  name: string;
  project: string;
  members: string[];
  removed: string[];
  completed: string[];
}

export interface Option {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  lists: Option[];
  removedList: string;
}

export type ReduxLoadingStatus = 'idle' | 'loading' | 'failed';
export type TaskStatusLists = 'members' | 'removed' | 'completed';
