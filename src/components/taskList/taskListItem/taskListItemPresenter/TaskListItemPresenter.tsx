import React from 'react';
import { Task } from '../../../../shared/TaskDef';

interface TaskListItemPresenterProps {
  task: Task;
}

export const TaskListItemPresenter = ({ task }: TaskListItemPresenterProps) => {
  return (
    <div className="flex flex-row">
      <div id={task.id}>{task.label}</div>
    </div>
  );
};
