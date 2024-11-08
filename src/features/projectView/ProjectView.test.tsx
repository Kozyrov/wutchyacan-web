import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ProjectView from './ProjectView';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { projectSlice } from '../../entities/project/projectSlice';
import { List, Project } from '../../app/types';
import { Params } from 'react-router-dom';
import { listSlice } from '../../entities/list/listSlice';

vi.mock('react-router-dom', () => ({
  useParams: (): Readonly<Params<string>> => ({ projectId: '1' }),
}));

describe('ProjectView', () => {
  let store: ReturnType<typeof configureStore>;
  const projectItem: Project = {
    id: '1',
    name: 'Test Project',
    lists: [{ id: 'list1', label: 'List 1' }],
  };

  const listMock: List = {
    id: projectItem.lists[0].id,
    name: projectItem.lists[0].label,
    project: projectItem.id,
    members: [],
    removed: [],
    completed: [],
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        project: projectSlice.reducer,
        list: listSlice.reducer,
      },
      preloadedState: {
        project: {
          ids: [projectItem.id],
          entities: {
            [projectItem.id]: projectItem,
          },
        },
        list: {
          ids: [projectItem.lists[0].id],
          entities: {
            [projectItem.lists[0].id]: listMock,
          },
        },
      },
    });
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('should render ProjectView component', () => {
    renderWithProviders(<ProjectView />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('should display the project name', () => {
    renderWithProviders(<ProjectView />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('should display the ListPortfolio component with the correct task lists', () => {
    renderWithProviders(<ProjectView />);
    expect(screen.getByText('List 1')).toBeInTheDocument();
  });
});
