import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InlineTaskInput } from './InlineTaskInput';
import { Task } from '../../app/types';

// src/components/taskInput/inlineTaskInput/InlineTaskInput.test.tsx

describe('InlineTaskInput', () => {
  const task: Task = {
    id: '1',
    label: 'Test Task',
    completed: false,
    points: 0,
  };

  const saveTask = vi.fn();
  const cancelInput = vi.fn();

  const renderComponent = () => {
    return render(
      <InlineTaskInput
        saveTask={saveTask}
        cancelInput={cancelInput}
        incomingTask={task}
      />
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

  it('should call saveTask on form submit', () => {
    renderComponent();
    const form = screen.getByTestId('inline-task-input-form');
    fireEvent.submit(form);
    expect(saveTask).toHaveBeenCalledWith({ ...task, label: 'Test Task' });
  });

  it('should call cancelInput when Cancel button is clicked', () => {
    renderComponent();
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(cancelInput).toHaveBeenCalled();
  });

  it('should call saveTask with updated task on form submit', () => {
    renderComponent();
    const input = screen.getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    const form = screen.getByTestId('inline-task-input-form');
    fireEvent.submit(form);
    expect(saveTask).toHaveBeenCalledWith({ ...task, label: 'Updated Task' });
  });
});
