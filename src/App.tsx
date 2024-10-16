import React from 'react';
import './App.css';
import { TaskInbox } from './features/taskInbox/TaskInbox';

const App = () => {
  return (
    <div id="watchucan_web_app" data-testid="app">
      <header></header>
      <div className="flex min-h-screen items-center justify-center">
        <TaskInbox />
      </div>
    </div>
  );
};

export default App;
