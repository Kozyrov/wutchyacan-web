import React, { memo, useState } from 'react';
import { type Task } from '../../../app/types';
import { TaskContextMenu } from '../../taskContextMenu/TaskContextMenu';
import { InlineTaskInput } from '../../taskInput/InlineTaskInput';
import { useAppDispatch } from '../../../app/hooks';
import { updateTask } from '../../../entities/task/taskSlice';

interface TaskListItemProps {
  task: Task;
}

export const TaskListItem = memo(({ task }: TaskListItemProps) => {
  const dispatch = useAppDispatch();
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
          onMouseLeave={() => {
            setShowControls(false);
            setContextMenuVisibility(false);
          }}
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
          saveTask={(updatedTask: Task) => dispatch(updateTask({id: updatedTask.id, changes: updatedTask}))}
        />
      )}
    </div>
  );
});

TaskListItem.displayName = 'TaskListItem';
