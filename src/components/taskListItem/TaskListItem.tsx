import React from 'react';
import {type Task} from '../../shared/TaskDef';
import {TaskListItemPresenter} from '../taskListItemPresenter/TaskListItemPresenter';

interface TaskListItemProps {
  task: Task;
}

export const TaskListItem = ({task}: TaskListItemProps) => {
  return (
    <div>
      <TaskListItemPresenter task={task} />
    </div>
  );
};
