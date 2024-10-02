import React, { useState } from 'react';
import { Task } from '../../../../shared/TaskDef';

interface TaskListItemInlineEditorProps {
  task: Task;
  onCancel: () => void;
}

export const TaskListItemInlineEditor = ({
  task,
  onCancel,
}: TaskListItemInlineEditorProps) => {
  const [label, setLabel] = useState<string>(task.label);

  return (
    <div>
      <input
        type="text"
        value={label}
        onChange={e => setLabel(e.target.value)}
      />
      <div>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="button">Save</button>
      </div>
    </div>
  );
};
