import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectEntry, { ProjectEntryProps } from './ProjectEntry';
import { Project } from '../../app/types';

describe('ProjectEntry', () => {
  const incomingProject: Project = { id: '1', name: 'Test Project', lists: [] };
  const save = vi.fn();
  const cancel = vi.fn();

  const renderProjectEntry = (props: ProjectEntryProps) => {
    return render(<ProjectEntry {...props} />);
  };

  it('should render ProjectEntry component', () => {
    renderProjectEntry({ incomingProject, save, cancel });
    expect(screen.getByText('Project Entry')).toBeInTheDocument();
  });

  it('should display the correct initial project name', () => {
    renderProjectEntry({ incomingProject, save, cancel });
    const input = screen.getByLabelText('Project Name') as HTMLInputElement;
    expect(input.value).toBe('Test Project');
  });

  it('should update the project name input correctly', () => {
    renderProjectEntry({ incomingProject, save, cancel });
    const input = screen.getByLabelText('Project Name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Updated Project' } });
    expect(input.value).toBe('Updated Project');
  });

  it('should call the save function with the correct argument when the Save button is clicked', () => {
    renderProjectEntry({ incomingProject, save, cancel });
    const input = screen.getByLabelText('Project Name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Updated Project' } });
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);
    expect(save).toHaveBeenCalledWith({
      ...incomingProject,
      name: 'Updated Project',
    });
  });

  it('should call the cancel function when the Cancel button is clicked', () => {
    renderProjectEntry({ incomingProject, save, cancel });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    expect(cancel).toHaveBeenCalled();
  });
});
