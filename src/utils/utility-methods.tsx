import { nanoid } from "@reduxjs/toolkit"
import { type Task } from "../shared/TaskDef"

export const randomIdString = () => (Date.now() + Math.random()).toString()
export const generateBlankTask = (): Task => ({
  id: nanoid(),
  label: "",
  points: 0,
  completed: false,
  removed: false,
})
