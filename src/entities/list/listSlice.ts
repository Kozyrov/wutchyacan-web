import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { List } from "../../app/types";
import { RootState } from "../../app/store";

const listAdapter = createEntityAdapter<List>();

const initialListState = listAdapter.getInitialState();

export const listSlice = createSlice({
    name: 'list',
    initialState: initialListState,
    reducers: {
        addList: listAdapter.addOne,
        removeList: listAdapter.removeOne,
        updateList: listAdapter.updateOne,
    },
});

export const { addList, removeList, updateList } = listSlice.actions;

export const {
    selectById: selectListById,
} = listAdapter.getSelectors((state: RootState) => state.list);