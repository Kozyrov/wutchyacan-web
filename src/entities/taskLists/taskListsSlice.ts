import { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../../app/store";
import { createAppSlice } from "../../app/createAppSlice";

interface TaskListsSliceState {
    [taskId: string]: string;
}

const initialTaskListsState: TaskListsSliceState = {};

export const taskListsSlice = createAppSlice({
    name: 'taskLists',
    initialState: initialTaskListsState,
    reducers: {
        assignTaskToList(state: TaskListsSliceState, action: PayloadAction<{taskId: string; listId: string}>) {
            state[action.payload.taskId] = action.payload.listId;
        },
        removeTaskFromList(state: TaskListsSliceState, action: PayloadAction<string>) {
            delete state[action.payload];
        },
    },
});

export const { assignTaskToList, removeTaskFromList } = taskListsSlice.actions;