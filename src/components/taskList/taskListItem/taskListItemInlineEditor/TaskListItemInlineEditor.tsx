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
  const [name, setName] = useState<string>(task.name);

  return (
    <div data-testid="task-list-item-inline-editor">
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
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
