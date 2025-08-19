import StatusTab from 'components/ui/StatusTab';
import type { TaskGetProps } from 'index';

import { RiCalendarLine } from '@remixicon/react';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import TaskForm from 'components/forms/TaskForm';
import { useState } from 'react';
import { TaskUpdateSchema } from 'lib/validation';

type Props = {
  taskDetails: TaskGetProps;
};

const TaskDetails = ({ taskDetails }: Props) => {
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);

  return (
    <div className='space-y-6 '>
      <div className='flex mb-2'>
        <StatusTab
          type={
            taskDetails.status === 0
              ? 'PENDING'
              : taskDetails.status === 1
                ? 'PROGRESS'
                : 'COMPLETED'
          }
        />
      </div>

      <div>
        <h3 className='heading-3'>{taskDetails.title}</h3>
      </div>

      <div>
        <h4 className='text-sm font-medium text-gray-500 mb-2'>DESCRIPTION</h4>
        <p className='text-gray-700 leading-relaxed'>
          {taskDetails.description}
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-gray-50 rounded-lg p-4'>
          <div className='flex items-center mb-2'>
            <RiCalendarLine className='w-4 h-4 text-gray-500 mr-2' />
            <span className='text-sm font-medium text-gray-500'>CREATED</span>
          </div>
          <p className='text-gray-800'>
            {new Date(taskDetails.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
      <div className='flex gap-2'>
        <Button
          type='button'
          text='Update'
          variant='PRIMARY'
          onClick={() => {
            setShowUpdateTaskModal(true);
          }}
        />
        <Button type='button' text='Delete' variant='SECONDARY' />
      </div>

      <Modal active={showUpdateTaskModal} setActive={setShowUpdateTaskModal}>
        <TaskForm
          key={taskDetails.id}
          type='UPDATE'
          schema={TaskUpdateSchema}
          defaultValues={{
            id: taskDetails.id,
            title: taskDetails.title,
            description: taskDetails.description,
            status: taskDetails.status.toString(),
          }}
        />
      </Modal>
    </div>
  );
};

export default TaskDetails;
