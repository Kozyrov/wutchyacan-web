import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import TaskListManager from './TaskListManager';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../../entities/task/taskSlice';
import listReducer from '../../entities/list/listSlice';
import { List, Task } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

// Mock necessary hooks and components
vi.mock('../../app/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../taskList/TaskList', () => ({
  __esModule: true,
  default: ({ tasks }: { tasks: Task[] }) => (
    <div data-testid="task-list">
      {tasks.map(task => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  ),
}));

describe('TaskListManager', () => {
  let store: ReturnType<typeof configureStore>;
  const taskListOption = { id: '1', label: 'Task List 1' };
  const tasks: Task[] = [
    { id: '1', name: 'Task 1', list: '1', completed: false, points: 0 },
    { id: '2', name: 'Task 2', list: '1', completed: false, points: 0 },
  ];

  const completedTasks: Task[] = [
    { id: '3', name: 'Task 3', list: '1', completed: true, points: 0 },
  ];

  const lists: List[] = [
    {
      id: '1',
      name: 'Task List 1',
      project: '1',
      members: tasks.map(task => task.id),
      removed: [],
      completed: completedTasks.map(task => task.id),
    },
  ];

  beforeEach(() => {
    store = configureStore({
      reducer: {
        task: taskReducer,
        list: listReducer,
      },
      preloadedState: {
        task: {
          ids: tasks
            .map(task => task.id)
            .concat(completedTasks.map(task => task.id)),
          entities: tasks.concat(completedTasks).reduce(
            (acc, task) => {
              acc[task.id] = task;
              return acc;
            },
            {} as Record<string, Task>
          ),
          removedTasks: {},
        },
        list: {
          ids: lists.map(list => list.id),
          entities: lists.reduce(
            (acc, list) => {
              acc[list.id] = list;
              return acc;
            },
            {} as Record<string, List>
          ),
        },
      },
    });

    (useAppDispatch as unknown as Mock).mockReturnValue(vi.fn());
    (useAppSelector as unknown as Mock).mockImplementation(selector =>
      selector(store.getState())
    );
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('should render TaskListManager component', () => {
    renderWithProviders(<TaskListManager taskListOption={taskListOption} />);
    expect(screen.getByTestId('task-list-manager')).toBeInTheDocument();
  });

  it('should display the list of tasks', () => {
    renderWithProviders(<TaskListManager taskListOption={taskListOption} />);
    tasks.forEach(task => {
      expect(screen.getByText(task.name)).toBeInTheDocument();
    });
  });

  it('should open and close the input for adding a new task', () => {
    renderWithProviders(<TaskListManager taskListOption={taskListOption} />);
    const addButton = screen.getByRole('button', { name: '+ Task' });
    fireEvent.click(addButton);
    const inputField = screen.getByTestId('inline-task-input');
    expect(inputField).toBeInTheDocument();
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    expect(screen.queryByTestId('inline-task-input')).not.toBeInTheDocument();
  });

  it('should display the list of completed tasks', () => {
    renderWithProviders(<TaskListManager taskListOption={taskListOption} />);
    expect(screen.getByText('completed')).toBeInTheDocument();
    completedTasks.forEach(task => {
      expect(screen.getByText(task.name)).toBeInTheDocument();
    });
  });
});
