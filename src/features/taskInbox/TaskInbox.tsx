import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { type Task } from '../../app/types';
import { InlineTaskInput } from '../../components/taskInput/InlineTaskInput';
import { generateBlankTask } from '../../utils/utility-methods';
import { TaskList } from '../../components/taskList/TaskList';
import { inboxId } from '../../app/constants';
import { selectAllTasksInListById } from '../../entities/list/listSlice';

export const TaskInbox = () => {
  const tasks: Task[] = useAppSelector(selectAllTasksInListById(inboxId));
  const [freshTask, setFreshTask] = useState<Task>(generateBlankTask(inboxId));

  const [addNewTaskInputOpen, setAddNewTaskInputOpen] =
    useState<boolean>(false);

  const refreshNewTaskInput = () => {
    setAddNewTaskInputOpen(false);
    setFreshTask(generateBlankTask(inboxId));
  };

  const handleCancelNewTaskInput = () => {
    setAddNewTaskInputOpen(false);
    refreshNewTaskInput();
  };

  return (
    <div data-testid="task-inbox">
      <TaskList tasks={tasks} />
      <div className="flex-row">
        {!addNewTaskInputOpen ? (
          <button type="button" onClick={() => setAddNewTaskInputOpen(true)}>
            + Task
          </button>
        ) : (
          <InlineTaskInput
            incomingTask={freshTask}
            closeInput={handleCancelNewTaskInput}
          />
        )}
      </div>
    </div>
  );
};
