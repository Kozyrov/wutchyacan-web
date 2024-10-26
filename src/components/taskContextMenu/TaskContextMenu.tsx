import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface TaskContextMenuProps {
  closeMenu: () => void;
}

export const TaskContextMenu = ({
  closeMenu,
  children,
}: PropsWithChildren<TaskContextMenuProps>) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef?.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} data-testid="task-context-menu">
      {children}
    </div>
  );
};

TaskContextMenu.displayName = 'TaskContextMenu';
