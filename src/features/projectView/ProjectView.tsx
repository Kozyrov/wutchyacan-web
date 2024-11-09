import React from 'react';
import ListPortfolio from '../../components/listPortfolio/ListPortfolio';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectProjectById } from '../../entities/project/projectSlice';
import { Project } from '../../app/types';

const ProjectView = () => {
  const project: Project = useAppSelector(state => {
    const { projectId } = useParams();
    if (!projectId) {
      console.error('Error in projectLoader:', 'projectId is undefined');
      throw new Response('Not Found', { status: 404 });
    }

    const projectData = selectProjectById(state, projectId);
    if (!projectData) {
      console.error('Error in projectLoader:', 'project not found');
      throw new Response('Not Found', { status: 404 });
    }

    return projectData;
  });

  return (
    <div>
      <h1>{project.name}</h1>

      <ListPortfolio taskListsOptions={project.lists} />
    </div>
  );
};

export default ProjectView;
