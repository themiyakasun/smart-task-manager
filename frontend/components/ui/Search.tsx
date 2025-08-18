import { RiSearchLine } from '@remixicon/react';
import React from 'react';

const Search = () => {
  return (
    <div className='relative'>
      <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-500'>
        <RiSearchLine />
      </div>
      <input
        type='text'
        placeholder='Search anything...'
        className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg'
      />
    </div>
  );
};

export default Search;
