import { createEntityAdapter, createSelector, createSlice, EntityState } from '@reduxjs/toolkit';
import { List, Task } from '../../app/types';
import { RootState } from '../../app/store';
import { inboxId } from '../../app/constants';
import { addTask, deleteTask } from '../task/taskSlice';

const listAdapter = createEntityAdapter<List>();

const defaultLists: List[] = [
  {
    id: inboxId,
    name: 'Inbox',
    members: [],
  }
];

export const initialListState = listAdapter.getInitialState(undefined, defaultLists);

const listState = (state: RootState) => state.list;
const taskState = (state: RootState) => state.task;

export const listSlice = createSlice({
  name: 'list',
  initialState: initialListState,
  reducers: {
    addList: listAdapter.addOne,
    removeList: listAdapter.removeOne,
    updateList: listAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask, (state, action) => {
        const { list, id } = action.payload;
        const updatePayload = {
         id: list, changes: { members: [...state.entities[list].members, id] }
        }
        listAdapter.updateOne(state, updatePayload);
      })
      .addCase(deleteTask, (state, action) => {
        const { list, id } = action.payload;
        const updatePayload = {
          id: list, changes: { members: state.entities[list].members.filter((memberId: string) => memberId !== id) }
        }
        listAdapter.updateOne(state, updatePayload);
      })
  },
});

export const { addList, removeList, updateList } = listSlice.actions;

export const selectAllTasksInListById = (listId: string) => createSelector(
  [listState, taskState],
  (list: EntityState<List, string>, task: EntityState<Task, string>) => {
    const memberIds: string[] = list.entities[listId]?.members;
    const memberTasks = memberIds.map((memberId: string) => task.entities[memberId]);
    return memberTasks;
  }
);

export const { selectById: selectListById } = listAdapter.getSelectors(
  (state: RootState) => state.list
);

export default listSlice.reducer;

