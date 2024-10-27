import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskListItemInlineEditor from './TaskListItemInlineEditor';
import { Task } from '../../../../app/types';

// src/components/taskList/taskListItem/taskListItemInlineEditor/TaskListItemInlineEditor.test.tsx

describe('TaskListItemInlineEditor', () => {
  const task: Task = {
    id: '1',
    name: 'Test Task',
    completed: false,
    points: 0,
    list: 'inbox',
  };

  const onCancel = vi.fn();

  const renderComponent = () => {
    return render(<TaskListItemInlineEditor task={task} onCancel={onCancel} />);
  };

  it('should render TaskListItemInlineEditor component', () => {
    renderComponent();
    expect(
      screen.getByTestId('task-list-item-inline-editor')
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
  });

  it('should update input value on change', () => {
    renderComponent();
    const input = screen.getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    expect(input).toHaveValue('Updated Task');
  });

  it('should call onCancel when Cancel button is clicked', () => {
    renderComponent();
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });

  it('should have a Save button', () => {
    renderComponent();
    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeInTheDocument();
  });
});
