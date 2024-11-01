import React from 'react';
import TaskListManager from '../taskListManager/TaskListManager';
import { Option } from '../../app/types';

interface ListPortfolioProps {
  taskListsOptions: Option[];
}

const ListPortfolio = ({ taskListsOptions }: ListPortfolioProps) => {
  return (
    <div>
      {taskListsOptions.map(taskListOption => (
        <div key={`${taskListOption.id}_${taskListOption.label}`}>
          <h1>{`${taskListOption.label}`}</h1>
          <TaskListManager taskListId={taskListOption.id} />
        </div>
      ))}
    </div>
  );
};

export default ListPortfolio;
