import React from 'react';
import BladeMenu from '../../components/bladeMenu/BladeMenu';
import { Option, Project } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addProject,
  selectAllProjectOptions,
} from '../../entities/project/projectSlice';
import ModalOverlay from '../../components/modalOverlay/ModalOverlay';
import ProjectEntry from '../../components/projectEntry/ProjectEntry';
import { generateNewProject } from '../../utils/utility-methods';

const ProjectsMenu = () => {
  const dispatch = useAppDispatch();
  const projectOptions: Option[] = useAppSelector(selectAllProjectOptions);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [freshProject, setFreshProject] = React.useState(generateNewProject());

  const handleProjectSave = (project: Project) => {
    dispatch(addProject(project));
    setIsModalOpen(false);
  };

  const cancelEntry = () => {
    setIsModalOpen(false);
    setFreshProject(generateNewProject());
  };

  const handleProjectNavigation = () => {
    console.log('Project navigation');
  };

  const renderNewProjectEntryModal = () => {
    return (
      <ModalOverlay toggleOff={cancelEntry}>
        <ProjectEntry
          save={handleProjectSave}
          cancel={cancelEntry}
          incomingProject={freshProject}
        />
      </ModalOverlay>
    );
  };

  return (
    <div>
      <BladeMenu
        label="Projects"
        addOptionAction={() => setIsModalOpen(true)}
        menuOptions={projectOptions}
        selectAction={handleProjectNavigation}
      />
      {isModalOpen && renderNewProjectEntryModal()}
    </div>
  );
};

export default ProjectsMenu;
