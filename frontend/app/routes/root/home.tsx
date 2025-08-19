import type { Route } from './+types/home';
import { useCallback, useEffect, useState } from 'react';
import type { TaskGetProps } from 'index';
import { getUsersTasksAPI } from 'services/task-service';
import { useAuth } from 'contexts/useAuth';
import TaskList from 'components/home/TaskList';
import Filterbar from 'components/home/Filterbar';
import Search from 'components/ui/Search';
import { statusOptions, sortOptions } from 'constants/index';
import Pagination from 'components/ui/Pagination';
import { useSearch } from 'contexts/useSearch';
import Spinner from 'components/ui/Spinner';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskGetProps[] | null>([]);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(statusOptions[0].value);
  const [currentSort, setCurrentSort] = useState(sortOptions[0].value);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { searchQuery } = useSearch();

  const getTasks = useCallback(() => {
    setLoading(true);
    getUsersTasksAPI(user?.id as number, {
      status: currentFilter,
      sortBy: 'CreatedAt',
      isDescending: currentSort === 'newest',
      pageNumber: currentPage,
      pageSize: 8,
      search: searchQuery,
    }).then((res) => {
      setTasks(res?.data!);
      setLoading(false);
    });
  }, [user?.id, currentFilter, currentSort, searchQuery]);

  const onFilterChange = (value: string) => {
    setCurrentFilter(value);
  };
  const onSortChange = (value: string) => {
    setCurrentSort(value);
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    getTasks();
  }, [currentFilter, currentSort, currentPage, searchQuery, getTasks]);

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

        {tasks !== null &&
          (loading ? <Spinner /> : <TaskList tasksList={tasks} />)}

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={tasks?.length! / 2}
        />
      </div>
    </div>
  );
}
