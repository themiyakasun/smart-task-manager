import TaskForm from 'components/forms/TaskForm';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import Search from 'components/ui/Search';
import { useAuth } from 'contexts/useAuth';
import { TaskSchema } from 'lib/validation';
import { useState } from 'react';

const Navbar = () => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const { logout } = useAuth();

  return (
    <header className='bg-white border-b border-gray-200 sticky top-0 z-40'>
      <div className='container mx-auto md:px-0 px-5'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>🔥</span>
              </div>
              <h1 className='text-xl font-semibold text-gray-900'>Task</h1>
            </div>
          </div>

          <div className='flex items-center'>
            <div className='hidden md:block flex-1 max-w-xl mx-8'>
              <Search />
            </div>
            <div className='flex-center space-x-2'>
              <Button
                variant='PRIMARY'
                text='Create Task'
                type='button'
                onClick={() => setShowCreateTaskModal(true)}
              />
              <Button
                variant='SECONDARY'
                text='Logout'
                type='button'
                onClick={logout}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal active={showCreateTaskModal} setActive={setShowCreateTaskModal}>
        <TaskForm
          type='CREATE'
          schema={TaskSchema}
          defaultValues={{ title: '', description: '', status: '0' }}
        />
      </Modal>
    </header>
  );
};

export default Navbar;
