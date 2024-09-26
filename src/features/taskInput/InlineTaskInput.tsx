import { type Task } from "../../shared/TaskDef"
import { type ChangeEvent, useState } from "react"

interface InlineTaskInputProps {
  saveTask: (task: Task) => void
  cancelInput: () => void
  incomingTask: Task
}

export const InlineTaskInput = ({
  saveTask,
  cancelInput,
  incomingTask,
}: InlineTaskInputProps) => {
  const [task, setTask] = useState<Task>(incomingTask)

  const handleLabelChange = (label: string) => {
    setTask({
      ...task,
      label,
    })
  }

  const handleSave = () => {
    saveTask(task)
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <input
          name="label"
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
  )
}
