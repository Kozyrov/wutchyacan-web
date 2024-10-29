import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Project } from '../../app/types';
import { createAppSlice } from '../../app/createAppSlice';
import { addList } from '../list/listSlice';
import { Option } from '../../app/types';
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
  selectors: {
    selectAllProjectOptions: (
      state: EntityState<Project, string>
    ): Option[] => {
      const projectOptions: Option[] = projectAdapter
        .getSelectors()
        .selectAll(state)
        .map(project => ({
          id: project.id,
          label: project.name,
        }));
      return projectOptions;
    },
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

export const { selectById: selectProjectById } = projectAdapter.getSelectors(
  (state: RootState) => state.project
);

export const { selectAllProjectOptions } = projectSlice.selectors;

export default projectSlice.reducer;
