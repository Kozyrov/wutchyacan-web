import React, { memo, useState } from 'react';
import { type Task } from '../../../app/types';
import { TaskContextMenu } from '../../taskContextMenu/TaskContextMenu';
import { InlineTaskInput } from '../../taskInput/InlineTaskInput';

interface TaskListItemProps {
  task: Task;
}

export const TaskListItem = memo(({ task }: TaskListItemProps) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [contextMenuVisibility, setContextMenuVisibility] =
    useState<boolean>(false);

  return (
    <div data-testid="task-list-item">
      {!editState ? (
        <div
          className="flex"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          data-testid="task-list-item-container"
        >
          <div className="flex flex-row">
            <div id={task.id}>{task.label}</div>
          </div>
          {showControls && (
            <div data-testid="task-list-item-controls">
              <button onClick={() => setEditState(true)}>edit</button>
              <button
                type="button"
                onClick={() => setContextMenuVisibility(!contextMenuVisibility)}
              >
                ***
              </button>
              {contextMenuVisibility && (
                <TaskContextMenu
                  task={task}
                  closeMenu={() => setContextMenuVisibility(false)}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <InlineTaskInput
          incomingTask={task}
          closeInput={() => setEditState(false)}
        />
      )}
    </div>
  );
});

TaskListItem.displayName = 'TaskListItem';
