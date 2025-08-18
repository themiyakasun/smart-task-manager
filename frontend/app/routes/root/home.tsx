import Card from 'components/ui/Card';
import type { Route } from './+types/home';
import { useEffect, useState } from 'react';
import type { TaskGetProps } from 'index';
import { getUsersTasksAPI } from 'services/task-service';
import { useAuth } from 'contexts/useAuth';
import TaskList from 'components/home/TaskList';
import Filterbar from 'components/home/Filterbar';

import { RiSearchLine } from '@remixicon/react';
import Search from 'components/ui/Search';

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
            <Search />
          </div>
        </div>

        {<Filterbar tasks={tasks!} user={user!} />}
        {tasks !== null && <TaskList tasksList={tasks} />}
      </div>
    </div>
  );
}
