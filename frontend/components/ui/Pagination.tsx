import React, { useState } from 'react';

import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
};

const Pagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    pages.push(1);
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className='flex items-center justify-center space-x-2 py-8'>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <RiArrowLeftLine className='w-5 h-5' />
      </button>

      {renderPageNumbers().map((page, index) => {
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page as number)}
            className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-colors ${
              currentPage === page
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <RiArrowRightLine className='w-5 h-5' />
      </button>
    </div>
  );
};

export default Pagination;
