import { createEntityAdapter, type PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { type ReduxLoadingStatus } from "../../shared/stateTypes";
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
    // increment: create.reducer(state => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // }),
    // decrement: create.reducer(state => {
    //   state.value -= 1
    // }),
    // // Use the `PayloadAction` type to declare the contents of `action.payload`
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload
    //   },
    // ),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    // incrementAsync: create.asyncThunk(
    //   async (amount: number) => {
    //     const response = await fetchCount(amount)
    //     // The value we return becomes the `fulfilled` action payload
    //     return response.data
    //   },
    //   {
    //     pending: state => {
    //       state.status = "loading"
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle"
    //       state.value += action.payload
    //     },
    //     rejected: state => {
    //       state.status = "failed"
    //     },
    //   },
    // ),
  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    // selectCount: counter => counter.value,
    // selectStatus: counter => counter.status,
  },
})

// Action creators are generated for each case reducer function.
export const { addTask, removeTask } =
  tasksSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
// export const {  } = tasksSlice.selectors

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
