import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BladeMenu, { BladeMenuProps } from './BladeMenu';

describe('BladeMenu', () => {
  const label = 'Test Menu';
  const addOptionAction = vi.fn();
  const selectAction = vi.fn();
  const menuOptions = [
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2' },
  ];

  const renderBladeMenu = (props: BladeMenuProps) => {
    return render(<BladeMenu {...props} />);
  };

  it('should render BladeMenu component', () => {
    renderBladeMenu({ label, addOptionAction, selectAction, menuOptions });
    expect(screen.getByTestId('blade-menu')).toBeInTheDocument();
  });

  it('should display the correct label', () => {
    renderBladeMenu({ label, addOptionAction, selectAction, menuOptions });
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should display the add option button and call addOptionAction when clicked', () => {
    renderBladeMenu({ label, addOptionAction, selectAction, menuOptions });
    const addButton = screen.getByRole('button', { name: 'add' });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(addOptionAction).toHaveBeenCalled();
  });

  it('should toggle the menu options when the toggle button is clicked', () => {
    renderBladeMenu({ label, addOptionAction, selectAction, menuOptions });
    const toggleButton = screen.getByRole('button', { name: 'toggle' });
    expect(toggleButton).toBeInTheDocument();

    // Initially, the menu options should be visible
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    // Click the toggle button to hide the menu options
    fireEvent.click(toggleButton);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();

    // Click the toggle button again to show the menu options
    fireEvent.click(toggleButton);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should render Blade components and call selectAction with the correct argument when a Blade button is clicked', () => {
    renderBladeMenu({ label, addOptionAction, selectAction, menuOptions });
    const option1Button = screen.getByRole('button', { name: 'Option 1' });
    const option2Button = screen.getByRole('button', { name: 'Option 2' });

    fireEvent.click(option1Button);
    expect(selectAction).toHaveBeenCalledWith(menuOptions[0]);

    fireEvent.click(option2Button);
    expect(selectAction).toHaveBeenCalledWith(menuOptions[1]);
  });
});
