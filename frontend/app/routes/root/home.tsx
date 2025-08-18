import Card from 'components/ui/Card';
import type { Route } from './+types/home';
import { useEffect, useState } from 'react';
import type { TaskGetProps } from 'index';
import { getUsersTasksAPI } from 'services/task-service';
import { useAuth } from 'contexts/useAuth';
import TaskList from 'components/home/TaskList';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskGetProps[] | null>([]);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    getUsersTasksAPI(user?.id as number).then((res) => setTasks(res?.data!));
  };

  return (
    <div className='container mx-auto'>
      <div className='flex-1 overflow-hidden'>
        <div className='h-full flex flex-col'>
          <div className='md:hidden p-4 bg-white border-b border-gray-200'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none'>
                <svg
                  className='h-5 w-5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <input
                type='text'
                placeholder='Search anything...'
                className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg'
              />
            </div>
          </div>
        </div>

        {tasks !== null && <TaskList tasksList={tasks} />}
      </div>
    </div>
  );
}
