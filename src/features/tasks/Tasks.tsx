import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Tasks.module.css"
import { addTask, removeTask, selectTaskEntities, type Task } from "./tasksSlice"
import { randomIdString } from "../../utils/utility-methods";
import { nanoid } from "@reduxjs/toolkit";

export const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks: Record<string, Task> = useAppSelector(selectTaskEntities);

  const generateBlankTask = (): Task => ({
    id: nanoid(),
    label: "",
    points: 0,
    completed: false,
    removed: false,
  });

  const handleAddGeneratedTask = () => {
    const generatedTask = generateBlankTask();
    dispatch(addTask(generatedTask));
  };

  const renderTasks = () => Object.values(tasks).map((taskEntity: Task) => (
    <div key={taskEntity.id}>
      {taskEntity.id}
    </div>
  ));

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Add blank task"
          onClick={handleAddGeneratedTask}
        >
          +
        </button>
      </div>
      {renderTasks()}
    </div>
  )
};
