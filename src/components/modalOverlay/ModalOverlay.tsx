import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalOverlayProps {
  toggleOff: () => void;
};

const ModalOverlay = ({ children, toggleOff }: PropsWithChildren<ModalOverlayProps>) => {
  const modalRoot = document.getElementById('modal-root');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (modalRef?.current && !modalRef.current.contains(event.target as Node)) {
        toggleOff();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!modalRoot) {
    throw new Error(
      "Root element with ID 'modal-root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'modal-root' in your HTML file."
    );
  }
  return createPortal(
    <div className="fixed flex z-10 left-0 top-0 w-screen h-screen bg-black/40 items-center justify-center">
      <div ref={modalRef} className="relative bg-white p-8">
        <button type="button" className="absolute right-3 top-2" onClick={toggleOff}>X</button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default ModalOverlay;