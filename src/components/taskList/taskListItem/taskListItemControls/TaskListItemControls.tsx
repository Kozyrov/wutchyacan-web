import React, { useState } from 'react';
import { TaskContextMenu } from '../../../taskContextMenu/TaskContextMenu';
import { Task } from '../../../../shared/TaskDef';

interface TaskListItemControlProps {
  task: Task;
  toggleEdit: () => void;
}

export const TaskListItemControls = ({
  toggleEdit,
  task,
}: TaskListItemControlProps) => {
  const [contextMenuVisibility, setContextMenuVisibility] =
    useState<boolean>(false);

  const toggleContextMenu = () => {
    setContextMenuVisibility(true);
  };
  return (
    <div>
      <button onClick={toggleEdit}>edit</button>
      <button type="button" onClick={toggleContextMenu}>
        ***
      </button>
      {contextMenuVisibility && (
        <TaskContextMenu
          task={task}
          closeMenu={() => setContextMenuVisibility(false)}
        />
      )}
    </div>
  );
};
