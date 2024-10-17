import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskContextMenu } from './TaskContextMenu';
import { Task } from '../../app/types';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer, { deleteTask } from '../../entities/Task/taskSlice';

// src/components/taskContextMenu/TaskContextMenu.test.tsx
const dispatch = vi.fn();

vi.mock('../../app/hooks', () => ({
  useAppDispatch: () => dispatch,
}));

describe('TaskContextMenu', () => {
  const task: Task = {
    id: '1',
    label: 'Test Task',
    completed: false,
    points: 0,
    list: 'inbox',
  };

  const closeMenu = vi.fn();

  const store = configureStore({
    reducer: {
      task: taskReducer,
    },
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <TaskContextMenu task={task} closeMenu={closeMenu} />
      </Provider>
    );
  };

  it('should render TaskContextMenu component', () => {
    renderComponent();
    expect(screen.getByTestId('task-context-menu')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should call closeMenu when clicking outside the menu', () => {
    renderComponent();
    fireEvent.mouseDown(document);
    expect(closeMenu).toHaveBeenCalled();
  });

  it('should dispatch deleteTask and call closeMenu when Delete button is clicked', () => {
    renderComponent();
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(dispatch).toHaveBeenCalledWith(deleteTask(task.id));
    expect(closeMenu).toHaveBeenCalled();
  });
});
