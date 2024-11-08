import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ListPortfolio from './ListPortfolio';
import { TaskListOption } from '../../app/types';

// Mock TaskListManager component
vi.mock('../taskListManager/TaskListManager', () => ({
  __esModule: true,
  default: ({ taskListOption }: { taskListOption: TaskListOption }) => (
    <div data-testid="task-list-manager">{taskListOption.id}</div>
  ),
}));

describe('ListPortfolio', () => {
  const taskListsOptions: TaskListOption[] = [
    { id: '1', label: 'Task List 1' },
    { id: '2', label: 'Task List 2' },
  ];

  it('should render ListPortfolio component', () => {
    render(<ListPortfolio taskListsOptions={taskListsOptions} />);
    expect(screen.getByText('Task List 1')).toBeInTheDocument();
    expect(screen.getByText('Task List 2')).toBeInTheDocument();
  });

  it('should display the correct task list labels', () => {
    render(<ListPortfolio taskListsOptions={taskListsOptions} />);
    taskListsOptions.forEach(taskListOption => {
      expect(screen.getByText(taskListOption.label)).toBeInTheDocument();
    });
  });

  it('should render TaskListManager component for each task list option', () => {
    render(<ListPortfolio taskListsOptions={taskListsOptions} />);
    const taskListManagers = screen.getAllByTestId('task-list-manager');
    expect(taskListManagers.length).toBe(taskListsOptions.length);
    taskListsOptions.forEach((taskListOption, index) => {
      expect(taskListManagers[index]).toHaveTextContent(taskListOption.id);
    });
  });
});
