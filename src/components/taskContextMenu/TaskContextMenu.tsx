import React, {forwardRef, useEffect} from 'react';
import {Task} from '../../shared/TaskDef';
import {useAppDispatch} from '../../app/hooks';
import {deleteInboxTask} from '../../features/taskInbox/taskInboxSlice';

interface TaskContextMenuProps {
  task: Task;
  close: () => void;
}

export const TaskContextMenu = forwardRef<HTMLDivElement, TaskContextMenuProps>(
  ({task}: TaskContextMenuProps, menuRef) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (!menuRef) return;
        if (menuRef.current && !menuRef.current.contains(event.target as Node))
          close();
      };

      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

    const handleDeleteTask = () => {
      dispatch(deleteInboxTask(task.id));
      close();
    };

    return (
      <div ref={menuRef}>
        <button type="button" onClick={handleDeleteTask}>
          Delete
        </button>
      </div>
    );
  }
);

TaskContextMenu.displayName = 'TaskContextMenu';
