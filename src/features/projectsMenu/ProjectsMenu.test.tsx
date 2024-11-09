import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import ProjectsMenu from './ProjectsMenu';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { projectSlice } from '../../entities/project/projectSlice';
import { Project } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

// Mock necessary hooks and components
vi.mock('../../app/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('ProjectsMenu', () => {
  let store: ReturnType<typeof configureStore>;
  const projectItem: Project = { id: '1', name: 'Test Project', lists: [] };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        project: projectSlice.reducer,
      },
      preloadedState: {
        project: {
          ids: [projectItem.id],
          entities: {
            [projectItem.id]: projectItem,
          },
        },
      },
    });

    (useAppDispatch as unknown as Mock).mockReturnValue(vi.fn());
    (useAppSelector as unknown as Mock).mockImplementation(
      (selector: (state: ReturnType<typeof store.getState>) => unknown) =>
        selector(store.getState())
    );
    (useNavigate as unknown as Mock).mockReturnValue(vi.fn());
  });

  const renderWithModalRootAndProviders = (ui: React.ReactElement) => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    return render(<Provider store={store}>{ui}</Provider>, {
      container: document.body.appendChild(document.createElement('div')),
    });
  };

  it('should render ProjectsMenu component', () => {
    renderWithModalRootAndProviders(<ProjectsMenu />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('should display the project options', () => {
    renderWithModalRootAndProviders(<ProjectsMenu />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('should open and close the modal for adding a new project', () => {
    renderWithModalRootAndProviders(<ProjectsMenu />);
    const addButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(addButton);
    expect(screen.getByText('Project Entry')).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    expect(screen.queryByText('Project Entry')).not.toBeInTheDocument();
  });

  it('should call handleProjectNavigation when a project option is clicked', () => {
    const navigate = useNavigate();
    renderWithModalRootAndProviders(<ProjectsMenu />);
    const projectOption = screen.getByText('Test Project');
    fireEvent.click(projectOption);
    expect(navigate).toHaveBeenCalledWith('/project/Test Project/1');
  });
});
