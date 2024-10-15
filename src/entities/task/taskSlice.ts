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

const initialState = taskAdapter.getInitialState(extendedTaskState);

// If you are not using async thunks you can use the standalone `createSlice`.
export const taskSlice = createAppSlice({
  name: 'task',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addTask: taskAdapter.addOne,
    removeTask(state, action: PayloadAction<Task>) {
      state.removedTasks[action.payload.id] = action.payload;
      taskAdapter.removeOne(state, action.payload.id);
    },
    deleteTask: taskAdapter.removeOne,
    updateTask: taskAdapter.updateOne,

  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {},
});

// Action creators are generated for each case reducer function.
export const { addTask, removeTask, deleteTask } =
  taskSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
// export const {  } = tasksSlice.selectors

// Rename the exports for readability in component usage
export const {
  selectById: selectTaskById,
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTotalTasks,
} = taskAdapter.getSelectors((state: RootState) => state.task);

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())

//     if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }
