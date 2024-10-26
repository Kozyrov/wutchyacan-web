import React from 'react';
import './App.css';
import SideBar from './components/sideBar/SideBar';
import { Link, Outlet } from 'react-router-dom';
import BladeMenu from './components/bladeMenu/BladeMenu';

const App = () => {
  const handleProjectNavigation = () => {
    console.log('Project navigation');
  };

  const handleAddNewProject = () => {
    console.log('Add new project');
  };

  return (
    <div id="watchucan_web_app" data-testid="app">
      <header></header>
      <div className="flex min-h-screen">
        <div className="h-screen w-72">
          <SideBar>
            <div className="p-4">
              <nav>
                <div className="flex">
                  <Link to="/inbox">Inbox</Link>
                </div>
                 
                <BladeMenu
                  label="Projects"
                  addOptionAction={handleAddNewProject}
                  menuOptions={[]}
                  selectAction={handleProjectNavigation}
                />
              </nav>
            </div>
          </SideBar>
        </div>

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
