import React from 'react';
import './App.css';
import SideBar from './features/sideBar/SideBar';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div id="watchucan_web_app" data-testid="app">
      <header></header>
      <div className="flex min-h-screen">
        <SideBar></SideBar>
        <main className="flex-col flex-grow h-full">
          <div className="justify-center m-7 p-3">
            <h1 className="font-bold">Wutchyacan</h1>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
