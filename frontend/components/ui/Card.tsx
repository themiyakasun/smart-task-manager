import type { CardProps } from 'index';

import StatusTab from './StatusTab';
import { useEffect, useState } from 'react';

const Card = ({
  title,
  description,
  id,
  status,
  createdAt,
  setShowTaskDetails,
  setActiveTask,
}: CardProps) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(
      new Date(createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, [createdAt]);
  return (
    <div
      className='card w-full'
      onClick={() => {
        setShowTaskDetails(true);
        setActiveTask(id);
      }}
    >
      <div className='flex mb-2'>
        <StatusTab
          type={
            status === 0 ? 'PENDING' : status === 1 ? 'PROGRESS' : 'COMPLETED'
          }
        />
      </div>
      <h2 className='heading-3'>{title}</h2>
      <p className='body-text line-clamp-2'>{description}</p>

      <div className='flex'>
        <div className='border border-border rounded-sm p-2 my-4'>
          <span className='text-md text-gray-500 font-medium'>
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
