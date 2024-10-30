import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from './ErrorPage';
import TaskInbox from '../features/taskInbox/TaskInbox';
import OverviewDashboard from '../features/overviewDashboard/OverviewDashboard';
import Project from '../features/project/Project';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '/',
        element: <OverviewDashboard />,
      },
      {
        path: '/inbox',
        element: <TaskInbox />,
      },
      {
        path: '/project/:projectName/:projectId',
        element: <Project />,
      },
    ],
  },
]);

export default Router;
