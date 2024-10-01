import React, {useEffect, useRef, useState} from 'react';
import {Task} from '../../shared/TaskDef';
import {TaskContextMenu} from '../taskContextMenu/TaskContextMenu';

interface TaskListItemPresenterProps {
  task: Task;
}

export const TaskListItemPresenter = ({task}: TaskListItemPresenterProps) => {
  const [contextMenuVisibility, setContextMenuVisibility] =
    useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleContextMenu = () => {
    setContextMenuVisibility(!contextMenuVisibility);
  };

  return (
    <div className="flex flex-row">
      <div id={task.id}>{task.label}</div>
      <button type="button" onClick={toggleContextMenu}>
        ***
      </button>
      {contextMenuVisibility && (
        <TaskContextMenu
          ref={menuRef}
          task={task}
          close={() => setContextMenuVisibility(false)}
        />
      )}
    </div>
  );
};
