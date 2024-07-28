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
        {/* <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span aria-label="Count" className={styles.value}>
          {count}
        </span> */}
        <button
          className={styles.button}
          aria-label="Add blank task"
          onClick={handleAddGeneratedTask}
        >
          +
        </button>
      </div>
      {renderTasks()}
      {/* <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          type="number"
          onChange={e => {
            setIncrementAmount(e.target.value)
          }}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          disabled={status !== "idle"}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => {
            dispatch(incrementIfOdd(incrementValue))
          }}
        >
          Add If Odd
        </button>
      </div> */}
    </div>
  )
};
