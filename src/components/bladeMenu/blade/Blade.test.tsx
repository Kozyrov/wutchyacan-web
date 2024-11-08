import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Blade, { BladeProps } from './Blade';

describe('Blade', () => {
  const menuOption = { id: '1', label: 'Test Option' };
  const action = vi.fn();

  const renderBlade = (props: BladeProps) => {
    return render(<Blade {...props} />);
  };

  it('should render Blade component', () => {
    renderBlade({ menuOption, action });
    expect(screen.getByText('Test Option')).toBeInTheDocument();
  });

  it('should display the correct label on the button', () => {
    renderBlade({ menuOption, action });
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Test Option');
  });

  it('should call the action function with the correct argument when the button is clicked', () => {
    renderBlade({ menuOption, action });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(action).toHaveBeenCalledWith(menuOption);
  });
});
