import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { type Task } from '../../shared/TaskDef';
import { addInboxTask, selectTaskEntities } from './taskInboxSlice';
import { InlineTaskInput } from '../../components/taskInput/InlineTaskInput';
import { generateBlankTask } from '../../utils/utility-methods';
import { TaskList } from '../../components/taskList/TaskList';

export const TaskInbox = () => {
  const dispatch = useAppDispatch();
  const tasks: Record<string, Task> = useAppSelector(selectTaskEntities);
  const [freshTask, setFreshTask] = useState<Task>(generateBlankTask());

  const [addNewTaskInputOpen, setAddNewTaskInputOpen] =
    useState<boolean>(false);

  const refreshNewTaskInput = () => {
    setAddNewTaskInputOpen(false);
    setFreshTask(generateBlankTask());
  };

  const handleSaveNewTask = (task: Task) => {
    dispatch(addInboxTask(task));
    refreshNewTaskInput();
  };

  const handleCancelNewTaskInput = () => {
    setAddNewTaskInputOpen(false);
    refreshNewTaskInput();
  };

  return (
    <div>
      <TaskList tasks={tasks} />
      <div className="flex-row">
        {!addNewTaskInputOpen ? (
          <button type="button" onClick={() => setAddNewTaskInputOpen(true)}>
            + Task
          </button>
        ) : (
          <InlineTaskInput
            incomingTask={freshTask}
            saveTask={handleSaveNewTask}
            cancelInput={handleCancelNewTaskInput}
          />
        )}
      </div>
    </div>
  );
};
