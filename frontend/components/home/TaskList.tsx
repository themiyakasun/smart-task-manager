import Card from 'components/ui/Card';
import type { TaskGetProps } from 'index';
import React from 'react';

type Props = {
  tasksList: TaskGetProps[];
};

const TaskList = ({ tasksList }: Props) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-20'>
      {tasksList?.map((task) => (
        <Card
          id={task.id}
          status={task.status}
          title={task.title}
          description={task.description}
          createdAt={task.createdAt}
        />
      ))}
    </div>
  );
};

export default TaskList;
