import React, { PropsWithChildren } from 'react';

const SideBar = ({ children }: PropsWithChildren) => {
  return <div className="h-full w-full bg-slate-400">{children}</div>;
};

export default SideBar;
