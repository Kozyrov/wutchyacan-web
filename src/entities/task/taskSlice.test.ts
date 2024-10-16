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
import { Task } from '../../app/types';
import { RootState } from '../../app/store';
import { listSlice } from '../List/listSlice';

// src/entities/Task/taskSlice.test.ts

describe('taskSlice', () => {
  let store: ReturnType<typeof configureStore>;
  const taskItem: Task = {
    id: '1',
    label: 'Test Task',
    points: 0,
    completed: false,
  };

  const updatedTaskItem: Task = {
    id: '1',
    label: 'Updated Test Task',
    points: 1,
    completed: true,
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
    store.dispatch(addTask(taskItem));
    const state = store.getState() as RootState;
    expect(state.task.ids).toContain(taskItem.id);
    expect(state.task.entities[taskItem.id]).toEqual(taskItem);
  });

  it('should handle removeTask', () => {
    store.dispatch(addTask(taskItem));
    store.dispatch(removeTask(taskItem));
    const state = store.getState() as RootState;
    expect(state.task.ids).not.toContain(taskItem.id);
    expect(state.task.entities[taskItem.id]).toBeUndefined();
    expect(state.task.removedTasks[taskItem.id]).toEqual(taskItem);
  });

  it('should handle deleteTask', () => {
    store.dispatch(addTask(taskItem));
    store.dispatch(deleteTask(taskItem.id));
    const state = store.getState() as RootState;
    expect(state.task.ids).not.toContain(taskItem.id);
    expect(state.task.entities[taskItem.id]).toBeUndefined();
  });

  it('should handle updateTask', () => {
    store.dispatch(addTask(taskItem));
    store.dispatch(
      updateTask({
        id: taskItem.id,
        changes: {
          label: updatedTaskItem.label,
          points: updatedTaskItem.points,
          completed: updatedTaskItem.completed,
        },
      })
    );
    const state = store.getState() as RootState;
    expect(state.task.entities[taskItem.id]?.label).toEqual(
      updatedTaskItem.label
    );
    expect(state.task.entities[taskItem.id]?.points).toEqual(
      updatedTaskItem.points
    );
    expect(state.task.entities[taskItem.id]?.completed).toEqual(
      updatedTaskItem.completed
    );
  });

  it('should select task by id', () => {
    store.dispatch(addTask(taskItem));
    const state = store.getState() as RootState;
    const selectedTask = selectTaskById(state, taskItem.id);
    expect(selectedTask).toEqual(taskItem);
  });

  it('should select all tasks', () => {
    store.dispatch(addTask(taskItem));
    const state = store.getState() as RootState;
    const selectedTasks = selectTaskEntities(state);
    expect(Object.keys(selectedTasks).length).toEqual(1);
    expect(selectedTasks).toEqual({ [taskItem.id]: taskItem });
  });
});
