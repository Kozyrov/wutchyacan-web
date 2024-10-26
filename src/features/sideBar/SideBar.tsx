import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="h-screen w-72 bg-slate-400">
      SideBar
      <nav>
        <ul>
          <li>
            <Link to="/inbox">Inbox</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
