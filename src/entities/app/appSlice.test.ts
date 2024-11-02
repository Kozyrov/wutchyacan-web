import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import appReducer, {
  toggleModal,
  selectIsModalOpen,
  AppState,
} from './appSlice';
import { RootState } from '../../app/store';

describe('appSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        app: appReducer,
      },
    });
  });

  it('should handle initial state', () => {
    const state = store.getState() as RootState;
    expect(state.app.isModalOpen).toBe(false);
  });

  it('should handle toggleModal', () => {
    store.dispatch(toggleModal());
    let state = store.getState() as RootState;
    expect(state.app.isModalOpen).toBe(true);

    store.dispatch(toggleModal());
    state = store.getState() as RootState;
    expect(state.app.isModalOpen).toBe(false);
  });

  it('should select isModalOpen', () => {
    let state = store.getState() as RootState;
    expect(selectIsModalOpen(state)).toBe(false);

    store.dispatch(toggleModal());
    state = store.getState() as RootState;
    expect(selectIsModalOpen(state)).toBe(true);
  });
});
