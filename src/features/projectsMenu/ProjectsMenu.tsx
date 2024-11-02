import React from 'react';
import BladeMenu from '../../components/bladeMenu/BladeMenu';
import { Option, Project } from '../../app/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addProject,
  selectAllProjects,
} from '../../entities/project/projectSlice';
import ModalOverlay from '../../components/modalOverlay/ModalOverlay';
import ProjectEntry from '../../components/projectEntry/ProjectEntry';
import { generateNewProject } from '../../utils/utility-methods';
import { useNavigate } from 'react-router-dom';

const ProjectsMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projectOptions: Option[] = useAppSelector(selectAllProjects).map(
    project => ({ id: project.id, label: project.name })
  );
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

  const handleProjectNavigation = (selectedProjectOption: Option) => {
    navigate(
      `/project/${selectedProjectOption.label}/${selectedProjectOption.id}`
    );
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
