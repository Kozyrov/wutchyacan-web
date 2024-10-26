import React from 'react';
import type { Task } from '../../app/types';
import TaskListItem from './taskListItem/TaskListItem';

interface TaskList {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskList) => {
  const renderTasks = () =>
    tasks.map((taskEntity: Task) => (
      <TaskListItem key={taskEntity.id} task={taskEntity} />
    ));

  return <div data-testid="task-list">{renderTasks()}</div>;
};

export default TaskList;
