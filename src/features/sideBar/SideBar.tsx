import React, { PropsWithChildren } from 'react';

const SideBar = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen w-72 bg-slate-400">
      SideBar
      <div>{children}</div>
    </div>
  );
};

export default SideBar;
