import { type Task } from "../../shared/TaskDef"
import controlStyles from "../../shared/Controls.module.css"
import { type ChangeEvent, type PropsWithChildren, useState } from "react"

interface InlineTaskInputProps {
  saveTask: (task: Task) => void
  incomingTask: Task
}

export const InlineTaskInput = ({
  saveTask,
  incomingTask,
}: InlineTaskInputProps) => {
  const [task, setTask] = useState<Task>(incomingTask)
  const [isActive, setIsActive] = useState<boolean>(false)

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
        <button type="submit" className={controlStyles.button} />
      </form>
    </div>
  )
}
