import React from 'react';
import { type Task } from '../../app/types';
import { type ChangeEvent, type FormEvent, useState } from 'react';

interface InlineTaskInputProps {
  saveTask: (task: Task) => void;
  cancelInput: () => void;
  incomingTask: Task;
}

export const InlineTaskInput = ({
  saveTask,
  cancelInput,
  incomingTask,
}: InlineTaskInputProps) => {
  const [task, setTask] = useState<Task>(incomingTask);

  const handleLabelChange = (label: string) => {
    setTask({
      ...task,
      label,
    });
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveTask(task);
  };

  return (
    <div data-testid="inline-task-input">
      <form onSubmit={e => handleSave(e)} data-testid="inline-task-input-form">
        <input
          name="label"
          autoFocus
          value={task.label}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleLabelChange(e.target.value)
          }
        />
        <button type="button" onClick={cancelInput}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
