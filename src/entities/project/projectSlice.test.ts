import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import projectReducer, {
  addProject,
  updateProject,
  selectProjectById,
  selectAllProjects,
  initialProjectState,
} from './projectSlice';
import { Project } from '../../app/types';
import { RootState } from '../../app/store';

describe('projectSlice', () => {
  let store: ReturnType<typeof configureStore>;
  const newProjectMock: Project = {
    id: '1',
    name: 'Project 1',
    lists: [],
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        project: projectReducer,
      },
    });
  });

  it('should have initial state', () => {
    const state = store.getState() as RootState;
    expect(state.project).toEqual(initialProjectState);
  });

  it('should add a project', () => {
    store.dispatch(addProject(newProjectMock));
    const state = store.getState() as RootState;
    expect(selectProjectById(state, '1')).toEqual(newProjectMock);
  });

  it('should update a project', () => {
    store.dispatch(addProject(newProjectMock));
    store.dispatch(
      updateProject({ id: '1', changes: { name: 'Updated Project 1' } })
    );
    const state = store.getState() as RootState;
    expect(selectProjectById(state, '1')?.name).toEqual('Updated Project 1');
  });

  it('should select all projects', () => {
    const newProjectMock2: Project = {
      id: '2',
      name: 'Project 2',
      lists: [],
    };
    store.dispatch(addProject(newProjectMock));
    store.dispatch(addProject(newProjectMock2));
    const state = store.getState() as RootState;
    expect(selectAllProjects(state)).toEqual([newProjectMock, newProjectMock2]);
  });
});
