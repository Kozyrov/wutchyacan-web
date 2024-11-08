import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ModalOverlay from './ModalOverlay';

describe('ModalOverlay', () => {
  const toggleOff = vi.fn();

  const renderWithModalRoot = (ui: React.ReactElement) => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    return render(ui, {
      container: document.body.appendChild(document.createElement('div')),
    });
  };

  it('should render ModalOverlay component', () => {
    renderWithModalRoot(
      <ModalOverlay toggleOff={toggleOff}>
        <div>Modal Content</div>
      </ModalOverlay>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should close the modal when clicking outside of it', () => {
    renderWithModalRoot(
      <ModalOverlay toggleOff={toggleOff}>
        <div>Modal Content</div>
      </ModalOverlay>
    );

    fireEvent.mouseDown(document);
    expect(toggleOff).toHaveBeenCalled();
  });

  it('should close the modal when clicking the close button', () => {
    renderWithModalRoot(
      <ModalOverlay toggleOff={toggleOff}>
        <div>Modal Content</div>
      </ModalOverlay>
    );

    const closeButton = screen.getByRole('button', { name: 'X' });
    fireEvent.click(closeButton);
    expect(toggleOff).toHaveBeenCalled();
  });
});
