import { statusOptions, sortOptions } from 'constants/index';
import type { TaskGetProps, UserData } from 'index';
import React, { useState } from 'react';

type Props = {
  tasks: TaskGetProps[];
  user: UserData;
  currentFilter: string;
  currentSort: string;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

const Filterbar = ({
  tasks,
  user,
  currentFilter,
  currentSort,
  onFilterChange,
  onSortChange,
}: Props) => {
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

      <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
        <div className='flex flex-col'>
          <label
            htmlFor='status-filter'
            className='text-xs font-medium text-gray-600 mb-1'
          >
            Filter by Status
          </label>
          <select
            id='status-filter'
            value={currentFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className='px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]'
          >
            {statusOptions.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <label
            htmlFor='sort-select'
            className='text-xs font-medium text-gray-600 mb-1 font-inter'
          >
            Sort by
          </label>
          <select
            id='sort-select'
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className='px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]'
          >
            {sortOptions.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
