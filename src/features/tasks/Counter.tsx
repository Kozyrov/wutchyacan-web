import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Counter.module.css"
import { addTask, removeTask, type Task } from "./tasksSlice"

export const Counter = () => {
  const dispatch = useAppDispatch()
  // const count = useAppSelector(selectCount)
  // const status = useAppSelector(selectStatus)
  // const [incrementAmount, setIncrementAmount] = useState("2")

  // const incrementValue = Number(incrementAmount) || 0

  const generateBlankTask = (): Task => {
    const rndmId = Date.now() + Math.random()
    return {
      id: rndmId.toString(),
      label: "",
      points: 0,
      completed: false,
      removed: false,
    }
  }

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
          onClick={() => dispatch(addTask(generateBlankTask()))}
        >
          +
        </button>
      </div>
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
}
