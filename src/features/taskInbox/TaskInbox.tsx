import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import controlStyles from "../../shared/Controls.module.css"
import styles from "./TaskInbox.module.css"
import { type Task } from "../../shared/TaskDef"
import { addInboxTask, selectTaskEntities } from "./taskInboxSlice"
import { InlineTaskInput } from "../taskInput/InlineTaskInput"
import { generateBlankTask } from "../../utils/utility-methods"

export const TaskInbox = () => {
  const dispatch = useAppDispatch()
  const tasks: Record<string, Task> = useAppSelector(selectTaskEntities)

  const [addNewTaskInputOpen, setAddNewTaskInputOpen] = useState<boolean>(false)

  const handleSaveTask = (task: Task) => {
    dispatch(addInboxTask(task))
  }

  const renderTasks = () =>
    Object.values(tasks).map((taskEntity: Task) => (
      <div key={taskEntity.id}>{taskEntity.id}</div>
    ))

  return (
    <div>
      <div className={styles.row}>
        {addNewTaskInputOpen ? (
          <button type="button" onClick={() => setAddNewTaskInputOpen(true)}>
            + Task
          </button>
        ) : (
          <InlineTaskInput
            incomingTask={generateBlankTask()}
            saveTask={handleSaveTask}
          />
        )}
      </div>
      {renderTasks()}
    </div>
  )
}
