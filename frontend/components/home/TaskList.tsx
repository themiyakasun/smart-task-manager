import Card from 'components/ui/Card';
import Modal from 'components/ui/Modal';
import type { TaskGetProps } from 'index';
import React, { useEffect, useState } from 'react';
import { getTaskByIdAPI } from 'services/task-service';
import TaskDetails from './TaskDetails';
import Spinner from 'components/ui/Spinner';

type Props = {
  tasksList: TaskGetProps[];
};

const TaskList = ({ tasksList }: Props) => {
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [taskDetails, setTaskDetails] = useState<TaskGetProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTask !== null) {
      setIsLoading(true);
      getTaskByIdAPI(activeTask).then((res) => {
        if (res?.status == 200) {
          setTaskDetails(res.data);
          setIsLoading(false);
        }
      });
    }
  }, [activeTask]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5'>
      {tasksList?.map((task) => (
        <>
          <Card
            id={task.id}
            status={task.status}
            title={task.title}
            description={task.description}
            createdAt={task.createdAt}
            key={task.id}
            setShowTaskDetails={setShowTaskDetails}
            setActiveTask={setActiveTask}
          />
        </>
      ))}
      <Modal active={showTaskDetails} setActive={setShowTaskDetails}>
        {taskDetails !== null &&
          (isLoading ? <Spinner /> : <TaskDetails taskDetails={taskDetails} />)}
      </Modal>
    </div>
  );
};

export default TaskList;
