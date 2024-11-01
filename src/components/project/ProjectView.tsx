import React, { useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { selectProjectById } from '../../entities/project/projectSlice';
import { Project } from '../../app/types';
import TaskListManager from '../listManager/TaskListManager';

const ProjectView = () => {
  const project: Project = useLoaderData();

  return (
    <div>
      <h1>{project.name}</h1>

      <TaskListManager taskLists={project.lists} />
    </div>
  );
};

export default ProjectView;
