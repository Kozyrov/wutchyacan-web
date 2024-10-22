import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { TaskInbox } from './TaskInbox';
import { Provider } from 'react-redux';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { addTask, taskSlice } from '../../entities/task/taskSlice';
import { listSlice } from '../../entities/list/listSlice';
import { Task } from '../../app/types';
import { inboxId } from '../../app/constants';

// src/features/taskInbox/TaskInbox.test.tsx

describe('TaskInbox', () => {
  let store: ReturnType<typeof configureStore>;
  const taskItem: Task = {
    id: '1',
    label: 'Test Task',
    points: 0,
    list: inboxId,
    completed: false,
  };

  const rootReducer = combineSlices(taskSlice, listSlice);

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('should render TaskInbox component', () => {
    renderWithProviders(<TaskInbox />);
    expect(screen.getByTestId('task-inbox')).toBeInTheDocument();
  });

  it('should display tasks', () => {
    store.dispatch(addTask(taskItem));
    renderWithProviders(<TaskInbox />);
    const tasks = screen.getByTestId('task-list');
    expect(tasks).toBeInTheDocument();
  });

  it('should display an add task button', () => {
    renderWithProviders(<TaskInbox />);
    const addTaskButton = screen.getByRole('button', { name: '+ Task' });
    expect(addTaskButton).toBeInTheDocument();
  });

  it('should display an input field when add task button is clicked', () => {
    renderWithProviders(<TaskInbox />);
    const addTaskButton = screen.getByRole('button', { name: '+ Task' });
    fireEvent.click(addTaskButton);
    const inputField = screen.getByTestId('inline-task-input');
    expect(inputField).toBeInTheDocument();
  });
});
