import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Project = () => {
  useEffect(() => {
    const { projectId } = useParams();
    if (!projectId) redirect('/error');
  });
  return <div>Project</div>;
};

export default Project;
