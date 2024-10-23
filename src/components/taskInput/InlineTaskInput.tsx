import React from 'react';
import { type Task } from '../../app/types';
import { type ChangeEvent, type FormEvent, useState } from 'react';

interface InlineTaskInputProps {
  closeInput: () => void;
  saveTask: (task: Task) => void; 
  incomingTask: Task;
}

export const InlineTaskInput = ({
  closeInput,
  saveTask,
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
    closeInput();
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
        <button type="button" onClick={closeInput}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
