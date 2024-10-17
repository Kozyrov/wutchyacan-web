import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { List } from '../../app/types';
import { RootState } from '../../app/store';
import { addTask } from '../Task/taskSlice';

const listAdapter = createEntityAdapter<List>();

export const initialListState = listAdapter.getInitialState();

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
  },
}); 

export const { addList, removeList, updateList } = listSlice.actions;

export const { selectById: selectListById } = listAdapter.getSelectors(
  (state: RootState) => state.list
);

export default listSlice.reducer;
