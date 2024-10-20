import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { taskSlice } from '../../entities/Task/taskSlice';
import { listSlice } from '../../entities/List/listSlice';
import { Task } from '../../app/types';
import { TaskList } from './TaskList';
import { inboxId } from '../../app/constants';

// src/components/taskList/TaskList.test.tsx

describe('TaskList', () => {
  let store: ReturnType<typeof configureStore>;
  const tasks: Task[] = [
    {
      id: '1',
      label: 'Test Task',
      points: 0,
      list: inboxId,
      completed: false,
    },
  ];

  const rootReducer = combineSlices(taskSlice, listSlice);

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('should render TaskList component', () => {
    renderWithProviders(<TaskList tasks={tasks} />);
    expect(screen.getByTestId('task-list')).toBeInTheDocument();
  });

  it('should display tasks', () => {
    renderWithProviders(<TaskList tasks={tasks} />);
    const displayedTasks = screen.getByTestId('task-list-item');
    expect(displayedTasks.children.length).toBe(Object.keys(tasks).length);
  });
});
