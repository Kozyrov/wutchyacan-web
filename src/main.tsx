import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from './routing/Routes';
import { store } from './app/store';
import { RouterProvider } from 'react-router-dom';
import './index.css';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
