import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllTasksByListId } from '../../entities/list/listSlice';
import { Task } from '../../app/types';
import { generateBlankTask } from '../../utils/utility-methods';
import TaskList from '../taskList/TaskList';
import InlineTaskInput from '../taskInput/InlineTaskInput';
import { addTask } from '../../entities/task/taskSlice';

interface TaskListManagerProps {
  taskListId: string;
}

const TaskListManager = ({ taskListId }: TaskListManagerProps) => {
  const dispatch = useAppDispatch();
  const tasks: Task[] = useAppSelector(
    selectAllTasksByListId(taskListId, 'members')
  );
  const completedTasks: Task[] = useAppSelector(
    selectAllTasksByListId(taskListId, 'completed')
  );
  const [freshTask, setFreshTask] = useState<Task>(
    generateBlankTask(taskListId)
  );

  const [addNewTaskInputOpen, setAddNewTaskInputOpen] =
    useState<boolean>(false);

  const refreshNewTaskInput = () => {
    setAddNewTaskInputOpen(false);
    setFreshTask(generateBlankTask(taskListId));
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

export default TaskListManager;
