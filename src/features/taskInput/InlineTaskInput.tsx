import { useAppDispatch } from "../../app/hooks"
import { type Task } from "../../shared/TaskDef"
import { type ChangeEvent, type FormEvent, useState } from "react"
import { addInboxTask } from "../taskInbox/taskInboxSlice"

interface InlineTaskInputProps {
  incomingTask: Task
}

export const InlineTaskInput = ({
  incomingTask,
}: InlineTaskInputProps) => {
  const dispatch = useAppDispatch()

  const [task, setTask] = useState<Task>(incomingTask)
  const [addNewTaskInputOpen, setAddNewTaskInputOpen] = useState<boolean>(false)
  
  const closeTaskInput = () => {
    setTask(incomingTask);
    setAddNewTaskInputOpen(false)
  }

  const handleLabelChange = (label: string) => {
    setTask({
      ...task,
      label,
    })
  }

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addInboxTask(task));
    closeTaskInput();
  }

  return (
    <div>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSave(e)}>
        {addNewTaskInputOpen ?
          (
            <>
              <input
                name="label"
                value={task.label}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleLabelChange(e.target.value)
                }
              />
              <button type="button" onClick={closeTaskInput}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </>
          ) :
          (
            <button type="button" onClick={() => setAddNewTaskInputOpen(true)}>
              + Task
            </button>
          )
        }
        
      </form>
    </div>
  )
}
