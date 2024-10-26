import React, { useState } from 'react';
import { Task } from '../../../../app/types';

interface TaskListItemInlineEditorProps {
  task: Task;
  onCancel: () => void;
}

const TaskListItemInlineEditor = ({
  task,
  onCancel,
}: TaskListItemInlineEditorProps) => {
  const [label, setLabel] = useState<string>(task.label);

  return (
    <div data-testid="task-list-item-inline-editor">
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

export default TaskListItemInlineEditor;
