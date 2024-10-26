import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage";
import TaskInbox from '../features/taskInbox/TaskInbox';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/inbox',
        element: <TaskInbox />
      }
    ]
  }
]);

export default Router;