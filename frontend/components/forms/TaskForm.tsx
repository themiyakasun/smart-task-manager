import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Button from 'components/ui/Button';
import FormField from 'components/ui/FormField';
import type { TaskFormProps } from 'index';
import { statusPostOptions } from 'constants/index';
import { createTaskAPI } from 'services/task-service';
import { useAuth } from 'contexts/useAuth';
import { toast } from 'react-toastify';

const TaskForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
}: TaskFormProps<T>) => {
  const isCreate = type === 'CREATE';
  const { user } = useAuth();

  const { handleSubmit, control } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<T> = async (data) => {
    if (isCreate) {
      createTaskAPI(
        data?.title,
        data.description,
        Number(data.status),
        user?.id as number
      ).then((res) => {
        if (res?.status === 200) {
          toast.success('Task added successfully');
        } else {
          toast.error('Failed to create task');
        }
      });
    }
  };

  return (
    <div className='bg-bg-primary shadow-md rounded-md p-5'>
      <div className='text-center mb-4'>
        <h2 className='heading-2'>
          {isCreate ? 'CREATE YOUR TASK' : 'UDATE YOUR TASK'}
        </h2>
      </div>

      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <FormField
          type='text'
          name='title'
          id='title'
          placeholder='Task Title'
          control={control}
        />
        <FormField
          type='textarea'
          name='description'
          id='description'
          placeholder='Description'
          control={control}
        />
        <FormField
          type='select'
          name='status'
          id='status'
          control={control}
          options={statusPostOptions}
          placeholder='Status'
        />
        <Button
          type='submit'
          variant='PRIMARY'
          text={isCreate ? 'Create' : 'Update'}
          customStyles='w-full'
        />
      </form>
    </div>
  );
};

export default TaskForm;
