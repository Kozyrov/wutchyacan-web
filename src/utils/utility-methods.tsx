import { nanoid } from '@reduxjs/toolkit';
import { Project, type Task } from '../app/types';

export const generateUniqueIteratorKey = () =>
  (Date.now() + Math.random()).toString();

export const generateBlankTask = (listId: string): Task => ({
  id: nanoid(),
  name: '',
  points: 0,
  list: listId,
  completed: false,
});

export const generateNewProject = (): Project => ({
  id: nanoid(),
  name: '',
  lists: [],
  removedList: '',
});
