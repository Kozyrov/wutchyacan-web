import { createEntityAdapter } from '@reduxjs/toolkit';
import { Project } from '../../app/types';
import { createAppSlice } from '../../app/createAppSlice';
import { addList } from '../list/listSlice';
import { RootState } from '../../app/store';

const projectAdapter = createEntityAdapter<Project>();

export const initialProjectState = projectAdapter.getInitialState();

export const projectSlice = createAppSlice({
  name: 'project',
  initialState: initialProjectState,
  reducers: {
    addProject: projectAdapter.addOne,
    updateProject: projectAdapter.updateOne,
  },
  extraReducers: builder => {
    builder.addCase(addList, (state, action) => {
      const { id, project, name } = action.payload;
      projectAdapter.updateOne(state, {
        id: project,
        changes: {
          lists: [...state.entities[project].lists, { id, label: name }],
        },
      });
    });
  },
});

export const { addProject, updateProject } = projectSlice.actions;

export const { selectById: selectProjectById, selectAll: selectAllProjects } =
  projectAdapter.getSelectors((state: RootState) => state.project);

export default projectSlice.reducer;
