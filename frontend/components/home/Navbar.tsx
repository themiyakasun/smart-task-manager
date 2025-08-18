import Button from 'components/ui/Button';
import { useAuth } from 'contexts/useAuth';
import React from 'react';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <header className='bg-white border-b border-gray-200 sticky top-0 z-40'>
      <div className='container mx-auto md:px-0 px-5'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>🔥</span>
              </div>
              <h1 className='text-xl font-semibold text-gray-900'>Task</h1>
            </div>
          </div>

          <div className='flex items-center'>
            <div className='hidden md:block flex-1 max-w-lg mx-8'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg
                    className='h-5 w-5 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  placeholder='Search anything...'
                  className='block w-full pl-10 pr-3 py-2 input-field'
                />
              </div>
            </div>
            <div className='flex-center space-x-2'>
              <Button variant='PRIMARY' text='Create Task' type='button' />
              <Button
                variant='SECONDARY'
                text='Logout'
                type='button'
                onClick={logout}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
