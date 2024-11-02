import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllTasksByListId } from '../../entities/list/listSlice';
import { Task, TaskListOption } from '../../app/types';
import { generateBlankTask } from '../../utils/utility-methods';
import TaskList from '../taskList/TaskList';
import InlineTaskInput from '../taskInput/InlineTaskInput';
import { addTask } from '../../entities/task/taskSlice';

interface TaskListManagerProps {
  taskListOption: TaskListOption;
}

const TaskListManager = ({ taskListOption }: TaskListManagerProps) => {
  const { id } = taskListOption;
  const dispatch = useAppDispatch();
  const tasks: Task[] = useAppSelector(selectAllTasksByListId(id, 'members'));
  const completedTasks: Task[] = useAppSelector(
    selectAllTasksByListId(id, 'completed')
  );
  const [freshTask, setFreshTask] = useState<Task>(generateBlankTask(id));

  const [addNewTaskInputOpen, setAddNewTaskInputOpen] =
    useState<boolean>(false);

  const refreshNewTaskInput = () => {
    setAddNewTaskInputOpen(false);
    setFreshTask(generateBlankTask(id));
  };

  const handleCancelNewTaskInput = () => {
    setAddNewTaskInputOpen(false);
    refreshNewTaskInput();
  };

  return (
    <div data-testid="task-manager" className="flex-col m-3 p-3">
      <h1 className="flex font-bold">{}</h1>
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
