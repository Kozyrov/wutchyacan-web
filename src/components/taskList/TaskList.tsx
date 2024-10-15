import React from 'react';
import type { Task } from '../../app/types';
import { TaskListItem } from './taskListItem/TaskListItem';
import { generateUniqueIteratorKey } from '../../utils/utility-methods';

interface TaskList {
  tasks: Record<string, Task>;
}

export const TaskList = ({ tasks }: TaskList) => {
  const renderTasks = () =>
    Object.values(tasks).map((taskEntity: Task) => (
      <TaskListItem key={generateUniqueIteratorKey()} task={taskEntity} />
    ));

  return <div>{renderTasks()}</div>;
};
