import { nanoid } from '@reduxjs/toolkit';
import { type Task } from '../app/types';

export const generateUniqueIteratorKey = () =>
  (Date.now() + Math.random()).toString();
export const generateBlankTask = (listId: string): Task => ({
  id: nanoid(),
  label: '',
  points: 0,
  list: listId,
  completed: false,
});
