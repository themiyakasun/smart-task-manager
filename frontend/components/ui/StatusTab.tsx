import type { StatusTabProps } from 'index';
import React from 'react';

const StatusTab = ({ type }: StatusTabProps) => {
  return (
    <div
      className={`status ${type === 'PENDING' ? 'status-pending' : type === 'PROGRESS' ? 'status-progress' : 'status-completed'}`}
    >
      {type === 'PENDING' ? (
        <>Pending</>
      ) : type === 'PROGRESS' ? (
        <>Progress</>
      ) : (
        <>Completed</>
      )}
    </div>
  );
};

export default StatusTab;
