import React from 'react';
import {type Task} from '../../shared/TaskDef';

interface TaskListItemProps {
  task: Task;
}

export const TaskListItem = ({task}: TaskListItemProps) => {
  return <div id={task.id}>{`${task.order}): ${task.label}`}</div>;
};
