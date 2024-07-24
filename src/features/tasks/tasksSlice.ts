import { createEntityAdapter, type PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { type ReduxLoadingStatus } from "../../shared/stateTypes";
import { type RootState } from "../../app/store";
// import type { AppThunk } from "../../app/store"
// import { fetchCount } from "./counterAPI"

export interface Task {
  id: string;
  label: string;
  order?: number;
  points: number;
  completed: boolean;
  removed: boolean;
}

export interface TasksSliceState {
  status: ReduxLoadingStatus,
  removedTasks: Map<string, Task>,
}

const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a: Task, b: Task) => a.points - b.points
})


const extendedTasksState: TasksSliceState = {
  status: "idle",
  removedTasks: new Map<string, Task>(),
}

const initialState = tasksAdapter.getInitialState(extendedTasksState);

// If you are not using async thunks you can use the standalone `createSlice`.
export const tasksSlice = createAppSlice({
  name: "tasks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addTask: tasksAdapter.addOne,
    removeTask(state, action: PayloadAction<Task>) {
      state.removedTasks.set(action.payload.id, action.payload);
      tasksAdapter.removeOne(state, action.payload.id);
    },
  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
  },
})

// Action creators are generated for each case reducer function.
export const { addTask, removeTask } =
  tasksSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
// export const {  } = tasksSlice.selectors

// Rename the exports for readability in component usage
export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = tasksAdapter.getSelectors((state: RootState) => state.tasks)

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
