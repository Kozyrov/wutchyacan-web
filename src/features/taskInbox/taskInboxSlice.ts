import { type Task } from '../../shared/TaskDef';
import { createEntityAdapter, type PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../app/createAppSlice';
import { type ReduxLoadingStatus } from '../../shared/TaskDef';
import { type RootState } from '../../app/store';

export interface TaskInboxSliceState {
  status: ReduxLoadingStatus;
  removedTasks: { [removedId: string]: Task };
}

const taskInboxAdapter = createEntityAdapter<Task>({
  sortComparer: (a: Task, b: Task) => a.points - b.points,
});

const extendedTaskInboxState: TaskInboxSliceState = {
  status: 'idle',
  removedTasks: {},
};

const initialState = taskInboxAdapter.getInitialState(extendedTaskInboxState);

// If you are not using async thunks you can use the standalone `createSlice`.
export const taskInboxSlice = createAppSlice({
  name: 'taskInbox',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addInboxTask: taskInboxAdapter.addOne,
    removeInboxTask(state, action: PayloadAction<Task>) {
      state.removedTasks[action.payload.id] = action.payload;
      taskInboxAdapter.removeOne(state, action.payload.id);
    },
    deleteInboxTask: taskInboxAdapter.removeOne,
  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {},
});

// Action creators are generated for each case reducer function.
export const { addInboxTask, removeInboxTask, deleteInboxTask } =
  taskInboxSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
// export const {  } = tasksSlice.selectors

// Rename the exports for readability in component usage
export const {
  selectById: selectTaskById,
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTotalTasks,
} = taskInboxAdapter.getSelectors((state: RootState) => state.taskInbox);

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
