import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App'; // Adjust the import path as necessary
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { taskSlice } from './entities/Task/taskSlice';
import { listSlice } from './entities/List/listSlice';
import { Provider } from 'react-redux';

// src/App.test.tsx

describe('App', () => {
  const rootReducer = combineSlices(taskSlice, listSlice);

  const store = configureStore({
    reducer: rootReducer,
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  it('should render App component', () => {
    renderComponent();
    expect(screen.getByTestId('task-inbox')).toBeInTheDocument();
  });

  it('should have the correct id', () => {
    renderComponent();
    const appDiv = screen.getByTestId('app');
    expect(appDiv).toHaveAttribute('id', 'watchucan_web_app');
  });
});
