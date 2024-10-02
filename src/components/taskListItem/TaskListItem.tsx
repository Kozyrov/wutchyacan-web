import React, { memo } from 'react';
import { type Task } from '../../shared/TaskDef';
import { TaskListItemPresenter } from '../taskListItemPresenter/TaskListItemPresenter';

interface TaskListItemProps {
  task: Task;
}

export const TaskListItem = memo(({ task }: TaskListItemProps) => {
  return (
    <div>
      <TaskListItemPresenter task={task} />
    </div>
  );
});

TaskListItem.displayName = 'TaskListItem';
