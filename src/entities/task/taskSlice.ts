import { type Task } from '../../app/types';
import { createEntityAdapter, type PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../app/createAppSlice';
import { type RootState } from '../../app/store';

interface TaskSliceState {
  removedTasks: { [removedId: string]: Task };
}

const taskAdapter = createEntityAdapter<Task>({
  sortComparer: (a: Task, b: Task) => a.points - b.points,
});

const extendedTaskState: TaskSliceState = {
  removedTasks: {},
};

export const initialTaskState = taskAdapter.getInitialState(extendedTaskState);

export const taskSlice = createAppSlice({
  name: 'task',
  initialState: initialTaskState,
  reducers: {
    addTask: taskAdapter.addOne,
    removeTask(state, action: PayloadAction<Task>) {
      state.removedTasks[action.payload.id] = action.payload;
      taskAdapter.removeOne(state, action.payload.id);
    },
    deleteTask(state, action: PayloadAction<Task>) {
      // whole task passed in for additional reducers in other slices.
      taskAdapter.removeOne(state, action.payload.id);
    },
    updateTask: taskAdapter.updateOne,
    completeTask(state, action: PayloadAction<Task>) {
      // whole task passed in for additional reducers in other slices.
      taskAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { completed: true },
      });
    },
  },
});

export const { addTask, removeTask, deleteTask, updateTask, completeTask } =
  taskSlice.actions;

export const {
  selectById: selectTaskById,
  selectEntities: selectTaskEntities,
} = taskAdapter.getSelectors((state: RootState) => state.task);

export default taskSlice.reducer;
