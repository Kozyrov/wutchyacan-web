import { describe, it, expect, beforeEach } from 'vitest';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  taskSlice,
  addTask,
  removeTask,
  deleteTask,
  updateTask,
  selectTaskById,
  selectTaskEntities,
} from './taskSlice';
import { List, Task } from '../../app/types';
import { RootState } from '../../app/store';
import { addList, listSlice } from '../list/listSlice';

// src/entities/task/taskSlice.test.ts

describe('taskSlice', () => {
  let store: ReturnType<typeof configureStore>;
  const taskItem: Task = {
    id: '1',
    name: 'Test Task',
    points: 0,
    completed: false,
    list: '101',
  };

  const listItem: List = {
    id: '101',
    name: 'Test List',
    project: 'default',
    members: [],
    removed: [],
    completed: [],
  };

  const updatedTaskItem: Task = {
    id: '1',
    name: 'Updated Test Task',
    points: 1,
    completed: true,
    list: '101',
  };

  const rootReducer = combineSlices(taskSlice, listSlice);

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });
  });

  it('should handle initial state', () => {
    const state = store.getState() as RootState;
    expect(state.task).toEqual(taskSlice.getInitialState());
  });

  it('should handle addTask', () => {
    store.dispatch(addList(listItem));
    store.dispatch(addTask(taskItem));
    const state = store.getState() as RootState;
    expect(state.task.ids).toContain(taskItem.id);
    expect(state.task.entities[taskItem.id]).toEqual(taskItem);
  });

  it('should handle removeTask', () => {
    store.dispatch(addList(listItem));
    store.dispatch(addTask(taskItem));
    store.dispatch(removeTask(taskItem));
    const state = store.getState() as RootState;
    expect(state.task.ids).not.toContain(taskItem.id);
    expect(state.task.entities[taskItem.id]).toBeUndefined();
    expect(state.task.removedTasks[taskItem.id]).toEqual(taskItem);
  });

  it('should handle deleteTask', () => {
    store.dispatch(addList(listItem));
    store.dispatch(addTask(taskItem));
    store.dispatch(deleteTask(taskItem));
    const state = store.getState() as RootState;
    expect(state.task.ids).not.toContain(taskItem.id);
    expect(state.task.entities[taskItem.id]).toBeUndefined();
  });

  it('should handle updateTask', () => {
    store.dispatch(addList(listItem));
    store.dispatch(addTask(taskItem));
    store.dispatch(
      updateTask({
        id: taskItem.id,
        changes: {
          name: updatedTaskItem.name,
          points: updatedTaskItem.points,
          completed: updatedTaskItem.completed,
        },
      })
    );
    const state = store.getState() as RootState;
    expect(state.task.entities[taskItem.id]?.name).toEqual(
      updatedTaskItem.name
    );
    expect(state.task.entities[taskItem.id]?.points).toEqual(
      updatedTaskItem.points
    );
    expect(state.task.entities[taskItem.id]?.completed).toEqual(
      updatedTaskItem.completed
    );
  });

  it('should select task by id', () => {
    store.dispatch(addList(listItem));
    store.dispatch(addTask(taskItem));
    const state = store.getState() as RootState;
    const selectedTask = selectTaskById(state, taskItem.id);
    expect(selectedTask).toEqual(taskItem);
  });

  it('should select all tasks', () => {
    store.dispatch(addList(listItem));
    store.dispatch(addTask(taskItem));
    const state = store.getState() as RootState;
    const selectedTasks = selectTaskEntities(state);
    expect(Object.keys(selectedTasks).length).toEqual(1);
    expect(selectedTasks).toEqual({ [taskItem.id]: taskItem });
  });
});
