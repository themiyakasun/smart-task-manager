import type { Route } from './+types/home';
import { useCallback, useEffect, useState } from 'react';
import type { TaskGetProps } from 'index';
import { createTaskAPI, getUsersTasksAPI } from 'services/task-service';
import { useAuth } from 'contexts/useAuth';
import TaskList from 'components/home/TaskList';
import Filterbar from 'components/home/Filterbar';
import Search from 'components/ui/Search';
import { statusOptions, sortOptions } from 'constants/index';
import { useSearch } from 'contexts/useSearch';
import Spinner from 'components/ui/Spinner';
import { LoginSchema, TaskSchema } from 'lib/validation';
import toast from 'react-hot-toast';
import AuthForm from 'components/forms/AuthForm';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Smart Task Management' },
    { name: 'description', content: 'Welcome to Smart Task management' },
  ];
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskGetProps[]>([]);
  const [currentFilter, setCurrentFilter] = useState(statusOptions[0].value);
  const [currentSort, setCurrentSort] = useState(sortOptions[0].value);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { searchQuery } = useSearch();

  const getTasks = useCallback(() => {
    if (!user?.id) return;
    setLoading(true);

    getUsersTasksAPI(user.id, {
      status: currentFilter,
      sortBy: 'CreatedAt',
      isDescending: currentSort === 'newest',
      search: searchQuery,
    }).then((res) => {
      setTimeout(() => {
        setTasks(res?.data ?? []);
        setLoading(false);
      }, 1000);
    });
  }, [user?.id, currentFilter, currentSort, searchQuery]);

  useEffect(() => {
    if (user?.id) {
      getTasks();
    }
  }, [getTasks]);

  const onFilterChange = (value: string) => {
    setCurrentFilter(value);
  };
  const onSortChange = (value: string) => {
    setCurrentSort(value);
  };

  return (
    <div className='container mx-auto'>
      <div className='flex-1 overflow-hidden'>
        <div className='h-full flex flex-col'>
          <div className='md:hidden p-4 bg-white border-b border-gray-200'>
            <Search />
          </div>
        </div>

        <Filterbar
          tasks={tasks!}
          user={user!}
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
          currentFilter={currentFilter}
          currentSort={currentSort}
        />

        {!loading && tasks.length === 0 && (
          <div className='flex-center mt-10'>
            <div>
              <h3 className='heading-3'>No Tasks Available</h3>
              <p>Hurry up and create task</p>
            </div>
          </div>
        )}

        {loading ? <Spinner /> : <TaskList tasksList={tasks} user={user!} />}
      </div>
    </div>
  );
}
