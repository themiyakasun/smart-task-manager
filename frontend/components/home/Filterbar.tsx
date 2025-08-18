import type { TaskGetProps, UserData } from 'index';
import React from 'react';

type Props = {
  tasks: TaskGetProps[];
  user: UserData;
};

const Filterbar = ({ tasks, user }: Props) => {
  return (
    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-20 md:px-0 px-5'>
      <div className='flex items-center space-x-3'>
        <h1 className='text-2xl font-semibold text-gray-900'>
          Welcome <span className='capitalize'>{user?.name}</span>! Your Tasks
        </h1>
        <div className='flex items-center space-x-2'>
          <span className='md:px-2 px-1 py-1 text-xs text-center font-medium bg-blue-100 text-blue-800 rounded-full'>
            {tasks?.length || 0} Total Tasks
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
