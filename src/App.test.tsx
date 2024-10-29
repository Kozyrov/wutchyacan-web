import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { taskSlice } from './entities/task/taskSlice';
import { listSlice } from './entities/list/listSlice';
import { Provider } from 'react-redux';
import Router from './routing/Routes';
import { RouterProvider } from 'react-router-dom';
import { projectSlice } from './entities/project/projectSlice';

// src/App.test.tsx

describe('App', () => {
  const rootReducer = combineSlices(taskSlice, listSlice, projectSlice);

  const store = configureStore({
    reducer: rootReducer,
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    );
  };

  it('should have the correct id', () => {
    renderComponent();
    const appDiv = screen.getByTestId('app');
    expect(appDiv).toHaveAttribute('id', 'watchucan_web_app');
  });
});
