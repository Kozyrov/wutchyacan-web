import React from 'react';
import { type Task } from '../../app/types';
import { type ChangeEvent, type FormEvent, useState } from 'react';

interface InlineTaskInputProps {
  closeInput: () => void;
  saveTask: (task: Task) => void;
  incomingTask: Task;
}

const InlineTaskInput = ({
  closeInput,
  saveTask,
  incomingTask,
}: InlineTaskInputProps) => {
  const [task, setTask] = useState<Task>(incomingTask);

  const handleNameChange = (name: string) => {
    setTask({
      ...task,
      name,
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
          name="name"
          autoFocus
          value={task.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleNameChange(e.target.value)
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

export default InlineTaskInput;
