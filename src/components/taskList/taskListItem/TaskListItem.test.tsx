import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { taskSlice } from '../../../entities/Task/taskSlice';
import { listSlice } from '../../../entities/List/listSlice';
import { TaskListItem } from './TaskListItem';

// src/components/taskList/taskListItem/TaskListItem.test.tsx

describe('TaskListItem', () => {
  let store: ReturnType<typeof configureStore>;
  const taskItem = {
    id: '1',
    label: 'Test Task',
    points: 0,
    list: 'inbox',
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

  it('should render TaskListItem component', () => {
    renderWithProviders(<TaskListItem task={taskItem} />);
    expect(screen.getByTestId('task-list-item')).toBeInTheDocument();
  });

  it('should display task label', () => {
    renderWithProviders(<TaskListItem task={taskItem} />);
    const taskLabel = screen.getByText(taskItem.label);
    expect(taskLabel).toBeInTheDocument();
  });

  it('should display and hide controls on cursor in and out', () => {
    renderWithProviders(<TaskListItem task={taskItem} />);
    const taskItemElement = screen.getByTestId('task-list-item-container');
    expect(screen.queryByTestId('task-list-item-controls')).toBeNull();
    fireEvent.mouseEnter(taskItemElement);
    expect(screen.getByTestId('task-list-item-controls')).toBeInTheDocument();
    fireEvent.mouseLeave(taskItemElement);
    expect(screen.queryByTestId('task-list-item-controls')).toBeNull();
  });

  it('should display edit button and open inline editor on click', () => {
    renderWithProviders(<TaskListItem task={taskItem} />);
    const taskItemElement = screen.getByTestId('task-list-item-container');
    fireEvent.mouseEnter(taskItemElement);
    const editButton = screen.getByText('edit');
    fireEvent.click(editButton);
    expect(
      screen.getByTestId('task-list-item-inline-editor')
    ).toBeInTheDocument();
  });

  it('should display context menu on click', () => {
    renderWithProviders(<TaskListItem task={taskItem} />);
    const taskItemElement = screen.getByTestId('task-list-item-container');
    fireEvent.mouseEnter(taskItemElement);
    const contextMenuButton = screen.getByText('***');
    fireEvent.click(contextMenuButton);
    expect(screen.getByTestId('task-context-menu')).toBeInTheDocument();
  });
});
