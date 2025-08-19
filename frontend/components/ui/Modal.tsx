import React from 'react';

import { RiCloseLine } from '@remixicon/react';

interface ModalProps {
  children: React.ReactNode;
  active: boolean;
  setActive: (active: boolean) => void;
}

const Modal = ({ children, active, setActive }: ModalProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm ${
        !active ? 'hidden' : ''
      }`}
    >
      <div className='container mx-auto px-4 py-8 h-full flex items-center justify-center overflow-y-auto'>
        <div className='bg-bg-primary rounded-lg max-w-4xl w-full p-6 md:p-8 relative my-8'>
          <button
            className='absolute top-10 right-10 z-10 bg-transparent text-text-primary  transition-colors cursor-pointer'
            onClick={() => setActive(false)}
          >
            <div className='w-6 h-6 flex items-center justify-center'>
              <RiCloseLine />
            </div>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
