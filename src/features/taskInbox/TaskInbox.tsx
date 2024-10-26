import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { type Task } from '../../app/types';
import InlineTaskInput from '../../components/taskInput/InlineTaskInput';
import { generateBlankTask } from '../../utils/utility-methods';
import TaskList from '../../components/taskList/TaskList';
import { inboxId } from '../../app/constants';
import { selectAllTasksByListId } from '../../entities/list/listSlice';
import { addTask } from '../../entities/task/taskSlice';

const TaskInbox = () => {
  const dispatch = useAppDispatch();
  const tasks: Task[] = useAppSelector(
    selectAllTasksByListId(inboxId, 'members')
  );
  const completedTasks: Task[] = useAppSelector(
    selectAllTasksByListId(inboxId, 'completed')
  );
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
    <div data-testid="task-inbox" className="flex-col m-3 p-3">
      <h1 className="flex font-bold">Inbox</h1>
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
            saveTask={(newTask: Task) => dispatch(addTask(newTask))}
          />
        )}
      </div>
      {!!completedTasks.length && <span>completed</span>}
      <TaskList tasks={completedTasks} />
    </div>
  );
};

export default TaskInbox;
