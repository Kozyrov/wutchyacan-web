import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskContextMenu } from './TaskContextMenu';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../../entities/task/taskSlice';

// src/components/taskContextMenu/TaskContextMenu.test.tsx
const dispatch = vi.fn();

vi.mock('../../app/hooks', () => ({
  useAppDispatch: () => dispatch,
}));

describe('TaskContextMenu', () => {
  const closeMenu = vi.fn();

  const store = configureStore({
    reducer: {
      task: taskReducer,
    },
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <TaskContextMenu closeMenu={closeMenu} />
      </Provider>
    );
  };

  it('should call closeMenu when clicking outside the menu', () => {
    renderComponent();
    fireEvent.mouseDown(document);
    expect(closeMenu).toHaveBeenCalled();
  });
});
