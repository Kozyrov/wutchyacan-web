import React, { memo, useState } from 'react';
import { type Task } from '../../../app/types';
import { TaskListItemPresenter } from './taskListItemPresenter/TaskListItemPresenter';
import { TaskListItemControls } from './taskListItemControls/TaskListItemControls';
import { TaskListItemInlineEditor } from './taskListItemInlineEditor/TaskListItemInlineEditor';

interface TaskListItemProps {
  task: Task;
}

export const TaskListItem = memo(({ task }: TaskListItemProps) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  return (
    <div>
      {!editState ? (
        <div
          className="flex"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <TaskListItemPresenter task={task} />
          {showControls && (
            <TaskListItemControls
              task={task}
              toggleEdit={() => setEditState(true)}
            />
          )}
        </div>
      ) : (
        <TaskListItemInlineEditor
          task={task}
          onCancel={() => setEditState(false)}
        />
      )}
    </div>
  );
});

TaskListItem.displayName = 'TaskListItem';
