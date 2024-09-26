import { useState } from "react"

import { useAppSelector } from "../../app/hooks"
import styles from "./TaskInbox.module.css"
import { type Task } from "../../shared/TaskDef"
import { selectTaskEntities } from "./taskInboxSlice"
import { InlineTaskInput } from "../taskInput/InlineTaskInput"
import { generateBlankTask } from "../../utils/utility-methods"

export const TaskInbox = () => {
  const tasks: Record<string, Task> = useAppSelector(selectTaskEntities)

  const renderTasks = () =>
    Object.values(tasks).map((taskEntity: Task) => (
      <div key={taskEntity.id}>{taskEntity.id}</div>
    ))

  return (
    <div>
      {renderTasks()}
      <div className={styles.row}>
        <InlineTaskInput incomingTask={generateBlankTask()} />
      </div>
    </div>
  )
}
