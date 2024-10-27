import React from 'react';
import BladeMenu from '../../components/bladeMenu/BladeMenu';
import { Option } from '../../app/types';
import { useAppSelector } from '../../app/hooks';
import { selectAllProjectOptions } from '../../entities/project/projectSlice';

const ProjectsMenu = () => {
  const projectOptions: Option[] = useAppSelector(selectAllProjectOptions); 
  
  const handleProjectNavigation = () => {
    console.log('Project navigation');
  };

  const handleAddNewProject = () => {
    console.log('Add new project');
  };

  return (
    <div>
      <BladeMenu
        label="Projects"
        addOptionAction={handleAddNewProject}
        menuOptions={projectOptions}
        selectAction={handleProjectNavigation}
      />  
    </div>
    
  );
}

export default ProjectsMenu;