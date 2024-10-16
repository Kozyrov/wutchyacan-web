import { nanoid } from '@reduxjs/toolkit';
import { type Task } from '../app/types';

export const generateUniqueIteratorKey = () =>
  (Date.now() + Math.random()).toString();
export const generateBlankTask = (): Task => ({
  id: nanoid(),
  label: '',
  points: 0,
  completed: false,
});
