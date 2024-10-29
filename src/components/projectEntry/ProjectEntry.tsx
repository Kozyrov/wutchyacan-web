import React, { useState } from 'react';
import { Project } from '../../app/types';

interface ProjectEntryProps {
  save: (project: Project) => void;
  cancel: () => void;
  incomingProject: Project;
}

const ProjectEntry = ({ incomingProject, save, cancel }: ProjectEntryProps) => {
  const [project, setProject] = useState(incomingProject);

  const handleSave = () => {
    save(project);
  };
  return (
    <div className="bg-white">
      <div className="flex justify-center m-3">
        <h1>Project Entry</h1>
      </div>
      <div className="m-3">
        <div className="flex-col">
          <label className="flex" htmlFor="project-name">
            Project Name
          </label>
          <input
            className="flex mt-1 border-2 border-black"
            type="text"
            id="project-name"
            value={project.name}
            onChange={e => setProject({ ...project, name: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button className="m-2 bg-slate-100" type="button" onClick={handleSave}>
          Save
        </button>
        <button className="m-2 bg-slate-100" type="button" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProjectEntry;
