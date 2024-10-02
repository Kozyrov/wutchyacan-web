import React, { useEffect, useRef } from 'react';
import { Task } from '../../shared/TaskDef';
import { useAppDispatch } from '../../app/hooks';
import { deleteInboxTask } from '../../features/taskInbox/taskInboxSlice';

interface TaskContextMenuProps {
  task: Task;
  closeMenu: () => void;
}

export const TaskContextMenu = ({ task, closeMenu }: TaskContextMenuProps) => {
  const dispatch = useAppDispatch();

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

  const handleDeleteTask = () => {
    dispatch(deleteInboxTask(task.id));
    closeMenu();
  };

  return (
    <div ref={menuRef}>
      <button type="button" onClick={handleDeleteTask}>
        Delete
      </button>
    </div>
  );
};

TaskContextMenu.displayName = 'TaskContextMenu';
