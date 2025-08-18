import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

import Button from 'components/ui/Button';
import FormField from 'components/ui/FormField';
import { useAuth } from 'contexts/useAuth';
import type { AuthFormProps } from 'index';

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
}: AuthFormProps<T>) => {
  const isSignin = type === 'SIGNIN';
  const { loginUser, registerUser } = useAuth();

  const { handleSubmit, control } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<T> = async (data) => {
    if (isSignin) {
      loginUser(data.email, data.password);
    } else {
      registerUser(data.email, data.name, data.password);
    }
  };

  return (
    <div className='bg-bg-primary shadow-md rounded-md p-5'>
      <div className='text-center mb-4'>
        <h2 className='heading-2'>
          {isSignin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
        </h2>
        <p className='font-inter'>
          {isSignin ? 'Sign in to continue' : 'Create an account'}
        </p>
      </div>

      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        {!isSignin && (
          <FormField
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            control={control}
          />
        )}
        <FormField
          type='text'
          name='email'
          id='email'
          placeholder='Email'
          control={control}
        />
        <FormField
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          control={control}
        />
        <Button
          type='submit'
          variant='PRIMARY'
          text={isSignin ? 'Login' : 'Sign Up'}
          customStyles='w-full'
        />
      </form>
      {isSignin ? (
        <p className='text-center mt-2'>
          Don't have an account?{' '}
          <a href='/sign-up' className='text-primary font-semibold'>
            Sign up
          </a>
        </p>
      ) : (
        <p className='text-center mt-2'>
          Already an account?{' '}
          <a href='/sign-in' className='text-primary font-semibold'>
            Sign in
          </a>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
