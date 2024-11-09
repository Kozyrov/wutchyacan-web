import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SideBar from './SideBar';

describe('SideBar', () => {
  const renderSideBar = (children: React.ReactNode) => {
    return render(<SideBar>{children}</SideBar>);
  };

  it('should render children correctly', () => {
    renderSideBar(<div>Test Content</div>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
