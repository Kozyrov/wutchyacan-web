import { describe, it, expect, beforeEach } from 'vitest';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  listSlice,
  addList,
  removeList,
  updateList,
  selectListById,
  initialListState,
} from './listSlice';
import { List, Task } from '../../app/types';
import { RootState } from '../../app/store';
import { addTask, taskSlice } from '../task/taskSlice';

// src/entities/list/listSlice.test.ts

describe('listSlice', () => {
  let store: ReturnType<typeof configureStore>;
  const listItem: List = {
    id: '1',
    name: 'Test List',
    members: ['member1'],
  };

  const updatedListItem: List = {
    id: '1',
    name: 'Updated Test List',
    members: ['member2'],
  };

  const newTask: Task = {
    id: '101',
    label: 'newMember',
    points: 0,
    list: listItem.id,
    completed: false,
  };

  const rootReducer = combineSlices(listSlice, taskSlice);

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });
  });

  it('should handle initial state', () => {
    const state = store.getState() as RootState;
    expect(state.list).toEqual(initialListState);
  });

  it('should handle addList', () => {
    store.dispatch(addList(listItem));
    const state = store.getState() as RootState;
    expect(state.list.ids).toContain(listItem.id);
    expect(state.list.entities[listItem.id]).toEqual(listItem);
  });

  it('should handle removeList', () => {
    store.dispatch(addList(listItem));
    store.dispatch(removeList(listItem.id));
    const state = store.getState() as RootState;
    expect(state.list.ids).not.toContain(listItem.id);
    expect(state.list.entities[listItem.id]).toBeUndefined();
  });

  it('should handle updateList', () => {
    store.dispatch(addList(listItem));
    // Change list name and add list member
    store.dispatch(
      updateList({
        id: listItem.id,
        changes: {
          name: updatedListItem.name,
          members: [...listItem.members, ...updatedListItem.members],
        },
      })
    );
    const state = store.getState() as RootState;
    expect(state.list.entities[listItem.id]?.name).toEqual(
      updatedListItem.name
    );
    expect(state.list.entities[listItem.id]?.members.length === 2);
    expect(state.list.entities[listItem.id]?.members[1]).toEqual(
      updatedListItem.members[0]
    );

    // Remove list member
    store.dispatch(
      updateList({
        id: listItem.id,
        changes: {
          members: listItem.members.filter(
            member => member !== updatedListItem.members[0]
          ),
        },
      })
    );
    expect(state.list.entities[listItem.id]?.members.length === 1);
    expect(
      state.list.entities[listItem.id]?.members[0] === listItem.members[0]
    );
  });

  it('should add tasks to specified list when addTask action received', () => {
    store.dispatch(addList(listItem));
    store.dispatch(addTask(newTask));
    const state = store.getState() as RootState;
    expect(state.list.entities[listItem.id]?.members).toContain(newTask.id);
  })

  it('should select list by id', () => {
    store.dispatch(addList(listItem));
    const state = store.getState() as RootState;
    const selectedList = selectListById(state, listItem.id);
    expect(selectedList).toEqual(listItem);
  });
});
