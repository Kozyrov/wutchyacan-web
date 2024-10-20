import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InlineTaskInput } from './InlineTaskInput';
import { Task } from '../../app/types';
import { Provider } from 'react-redux';
import taskReducer, { addTask } from '../../entities/Task/taskSlice';
import listReducer from '../../entities/List/listSlice';
import { configureStore } from '@reduxjs/toolkit';
import { inboxId } from '../../app/constants';

// src/components/taskInput/inlineTaskInput/InlineTaskInput.test.tsx
const dispatch = vi.fn();

vi.mock('../../app/hooks', () => ({
  useAppDispatch: () => dispatch,
}));

describe('InlineTaskInput', () => {
  const taskStub: Task = {
    id: '1',
    label: 'Test Task',
    completed: false,
    points: 0,
    list: inboxId,
  };

  const mockCloseInput = vi.fn();

  const storeMock = configureStore({
    reducer: {
      task: taskReducer,
      list: listReducer,
    },
  });

  const renderComponent = () => {
    return render(
      <Provider store={storeMock}>
        <InlineTaskInput closeInput={mockCloseInput} incomingTask={taskStub} />
      </Provider>
    );
  };

  it('should render InlineTaskInput component', () => {
    renderComponent();
    expect(screen.getByTestId('inline-task-input')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
  });

  it('should update input value on change', () => {
    renderComponent();
    const input = screen.getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    expect(input).toHaveValue('Updated Task');
  });

  it('should dispatch addTask and call closeInput when submitted', () => {
    renderComponent();
    const form = screen.getByTestId('inline-task-input-form');
    fireEvent.submit(form);
    expect(dispatch).toHaveBeenCalledWith(addTask(taskStub));
    expect(mockCloseInput).toHaveBeenCalled();
  });

  it('should call cancelInput when Cancel button is clicked', () => {
    renderComponent();
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockCloseInput).toHaveBeenCalled();
  });
});
