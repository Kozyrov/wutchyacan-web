import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Project } from '../../app/types';
import ListPortfolio from '../../components/listPortfolio/ListPortfolio';

const ProjectView = () => {
  const project = useLoaderData() as Project;

  return (
    <div>
      <h1>{project.name}</h1>

      <ListPortfolio taskListsOptions={project.lists} />
    </div>
  );
};

export default ProjectView;
