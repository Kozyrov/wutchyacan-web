import React from 'react';
import TaskListManager from '../taskListManager/TaskListManager';
import { TaskListOption } from '../../app/types';

interface ListPortfolioProps {
  taskListsOptions: TaskListOption[];
}

const ListPortfolio = ({ taskListsOptions }: ListPortfolioProps) => {
  return (
    <div>
      {taskListsOptions.map(taskListOption => (
        <div key={`${taskListOption.id}_${taskListOption.label}`}>
          <h1>{`${taskListOption.label}`}</h1>
          <TaskListManager taskListOption={taskListOption} />
        </div>
      ))}
    </div>
  );
};

export default ListPortfolio;
