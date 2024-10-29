import { createAppSlice } from '../../app/createAppSlice';

interface AppState {
  isModalOpen: boolean;
}

const initialAppState = {
  isModalOpen: false,
};

export const appSlice = createAppSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    toggleModal(state: AppState) {
      state.isModalOpen = !state.isModalOpen;
    },
  },
  selectors: {
    selectIsModalOpen(state: AppState) {
      return state.isModalOpen;
    },
  },
});

export const { toggleModal } = appSlice.actions;

export const { selectIsModalOpen } = appSlice.selectors;

export default appSlice.reducer;
