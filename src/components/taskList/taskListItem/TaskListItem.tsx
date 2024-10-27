import React, { memo, useState } from 'react';
import { type Task } from '../../../app/types';
import TaskContextMenu from '../../taskContextMenu/TaskContextMenu';
import InlineTaskInput from '../../taskInput/InlineTaskInput';
import { useAppDispatch } from '../../../app/hooks';
import {
  completeTask,
  deleteTask,
  updateTask,
} from '../../../entities/task/taskSlice';

interface TaskListItemProps {
  task: Task;
}

const TaskListItem = memo(({ task }: TaskListItemProps) => {
  const dispatch = useAppDispatch();
  const [editState, setEditState] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [contextMenuVisibility, setContextMenuVisibility] =
    useState<boolean>(false);

  const handleDeleteTask = () => {
    dispatch(deleteTask(task));
    setContextMenuVisibility(false);
  };

  return (
    <div
      data-testid="task-list-item"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => {
        setShowControls(false);
        setContextMenuVisibility(false);
      }}
    >
      {!editState ? (
        <div className="flex" data-testid="task-list-item-container">
          {showControls && !task.completed && (
            <div>
              <button
                type="button"
                role="checkbox"
                onClick={() => dispatch(completeTask(task))}
              >
                complete
              </button>
            </div>
          )}
          <div className="flex flex-row">
            <div id={task.id}>{task.name}</div>
          </div>
          {showControls && (
            <div data-testid="task-list-item-controls">
              {!task.completed && (
                <button onClick={() => setEditState(true)}>edit</button>
              )}
              <button
                type="button"
                onClick={() => setContextMenuVisibility(!contextMenuVisibility)}
              >
                ***
              </button>
              {contextMenuVisibility && (
                <TaskContextMenu
                  closeMenu={() => setContextMenuVisibility(false)}
                >
                  <button type="button" onClick={handleDeleteTask}>
                    Delete
                  </button>
                </TaskContextMenu>
              )}
            </div>
          )}
        </div>
      ) : (
        <InlineTaskInput
          incomingTask={task}
          closeInput={() => setEditState(false)}
          saveTask={(updatedTask: Task) =>
            dispatch(updateTask({ id: updatedTask.id, changes: updatedTask }))
          }
        />
      )}
    </div>
  );
});

TaskListItem.displayName = 'TaskListItem';

export default TaskListItem;
