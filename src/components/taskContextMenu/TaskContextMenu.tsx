import React, { useEffect, useRef } from 'react';
import { Task } from '../../app/types';
import { useAppDispatch } from '../../app/hooks';
import { deleteTask } from '../../entities/task/taskSlice';

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
    dispatch(deleteTask(task.id));
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
